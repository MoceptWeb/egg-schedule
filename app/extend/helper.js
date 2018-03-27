'use strict';
const mssql = require('mssql')


module.exports = {
  async sqlserverQuery(sql, client = 'oa') {
    const config = this.app.config['jybsqlserver'][client]

    try {
        // await sql.close();
        let pool = await mssql.connect(config)
        const request = pool.request();
        
        let result = await request.query(sql)
        this.ctx.logger.info('serversqlQuery '+ sql);
        // console.dir(result1.recordsets[0][0])
        return result;
    } catch (err) {
        this.ctx.logger.error('sqlserver数据库error: ' + sql + ' ' + err);
        return false;
    }
  },

  /* async passportMysqlConnect() {
    const portalConfig= this.app.config['passportJyb']
    let mysqlConnect = null;
    if(portalConfig.userDBClient) {
      mysqlConnect = this.app.mysql.get(portalConfig.userDBClient)
    } else {
      mysqlConnect = this.app.mysql
    } 
    if(!mysqlConnect) {
      this.ctx.logger.error('数据库连接数据');
    }
    return mysqlConnect;
  }, */

  async mysqlQuery(sql, param) {
    const mysqlConnect = this.app.mysql;
    const ctx = this.ctx;
    try {
      ctx.logger.info('sqlQuery '+ sql + ' ' + JSON.stringify(param));
      const queryResult = await mysqlConnect.query(sql, param);
      return queryResult;
    } catch(e) {
      ctx.logger.error('mysql数据库error: ' + sql + ' ' + JSON.stringify(param) + ' ' +e.message);
      return false;
      // 重新调用
    }
  },
  trim (string, char, type) {
    if (char) {
      if (type == 'left') {
        return string.replace(new RegExp('^\\'+char+'+', 'g'), '');
      } else if (type == 'right') {
        return string.replace(new RegExp('\\'+char+'+$', 'g'), '');
      }
      return string.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return string.replace(/^\s+|\s+$/g, '');
  }
}
