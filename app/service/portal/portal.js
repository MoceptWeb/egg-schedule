'use strict';

const Service = require('egg').Service;
var fs = require('fs'); 
var path = require('path'); 

var lineReader = require('line-reader');


class PortalService extends Service {
  async updatePortal2User() {
    const target = path.join(this.config.baseDir, 'app/public', 'sql', 't_info.txt');
    const self = this;
    const fileData = await this.readLine(target);
    let promiseAll = [];
    fileData.forEach(portal => {
      promiseAll.push(Promise.resolve(self.updateUserByPortalId(portal)));
    });
    await Promise.all(promiseAll);

    // read all lines:
    
  }

  async updateUserByPortalId({user_center_id, user_id}) {
    const res = await this.ctx.helper.mysqlQuery('update t_user set user_center_id = ? where user_id = ?', [user_center_id, user_id]);
  }

  async readLine(target) {
      let array = [];
      const self = this;
      const file = await new Promise(function (resolve, reject) {
        lineReader.eachLine(target, function(line, last) {
            // line.split(/\s/)[0]
            let data = line.split(/\s/)
            if(data[2]) {
                array.push({
                    user_id: self.ctx.helper.trim(data[0], '"'),
                    mail: self.ctx.helper.trim(data[1], '"'),
                    user_center_id: self.ctx.helper.trim(data[2], '"'),
                })
            }

            if(last) {
                resolve(array)
            }
        })
      })

      return file;

  }

}

module.exports = PortalService;
