'use strict';

const Service = require('egg').Service;
const rds = require('ali-rds');

class OaService extends Service {
    /* 
    1、获取全部oauser
    2、比对oa和运营的用户
       （1）根据oa： lastname  => 运营： user_name
       （2）
          - 如果一个都没找到  oa： loginid => 运营： user_account
              - 如果一个都没有就结束
              - 如果多个匹配上打log
          - 如果有name有多条对应上， 则再次匹配loginid
              - 如果一个都没有就结束
              - 匹配多个打log
      （3）导出email 给 portal
      （4） 根据portal返回的portal_id => email 更新运营的 user_center_id
    */   
    async updateOa2User() {
        const oaUser = await this.getOaUser();
        const user = await this.updateUser(oaUser);
    }
    async getOaUser() {
        const res = await this.ctx.helper.sqlserverQuery("select lastname,loginid,email from HrmResource where email IS NOT NULL and email != '' ");
        if(res) {
            return res.recordsets[0];
        }
    }
    //
    async updateUser(oaUser) {
        const self = this;
        let promiseAll = [];
         // 设置promise对象，同步发请求
        oaUser.forEach(oa => {
          promiseAll.push(Promise.resolve(self.updateUserByName(oa)));
        });

        // promiseAll = oaUser.map(oa => {
        //     self.updateUserByName(oa)
        //   });
        await Promise.all(promiseAll);
    }

    async updateUserByName(oaUser) {
        const res = await this.ctx.helper.mysqlQuery('select user_name,user_id,user_account from t_user where user_name = ?', [oaUser.lastname]);
        let update = null;
        if(res && res.length === 1) {
            update = await this.updateUserByUserId(oaUser, res[0])
        } else {
            // 再次匹配loginid
            update = await this.updateUserByAccount(oaUser)
        } 
        // if(res.rowsAffected[0])
        return update;
    }

    async updateUserByAccount(oaUser) {
        const res = await this.ctx.helper.mysqlQuery('select user_id from t_user where user_account = ?', [oaUser.loginid]);
        let update = null;
        if(res && res.length === 1) {
            update = await this.updateUserByUserId(oaUser, res[0])
        } else if(res.length > 1) {
            this.ctx.logger.error(oaUser.loginid + '根据oa 登录名loginid匹配运营account有超过两条数据')
        } else {
            return false;
        }
    }

    async updateUserByUserId(oaUser, user) {
        const res = await this.ctx.helper.mysqlQuery('update t_user set mail = ? where user_id = ?', [oaUser.email, user.user_id]);
    }

    async sqlBeginTransaction() {
        const conn = await this.app.mysql.beginTransaction();

        try {
            const res = await conn.query('update t_user set mail = ? where user_id = ?', [oaUser.email, user.user_id]);
            if(res && res.affectedRows === 1) {
               await conn.commit();
            } else if(res.affectedRows > 1){
                // this.ctx.logger.error('')
               await conn.rollback()                
            } else {
                await conn.rollback()                
            }
        } catch (err) {
        // error, rollback
          await conn.rollback(); // rollback call won't throw err
          throw err;
        }
    }


  async sqlserver(param) {
    const res = await this.ctx.helper.sqlserverQuery("select * from HrmResource where id = 3");
    return res;
  }

  /*   async mysql(param) {
    const db = rds({
        host: '172.16.1.13',
        port: 3306,
        user: 'jiayoubao',
        password: 'root1234',
        database: "db_jyb_test"
      });
    
    let res = await db.select('t_user', {
        where: {
          user_id: 186
        }
    });
    return res;
  } */
}

module.exports = OaService;
