'use strict';

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = appInfo => {
  const config = exports = {};
  // log目录配置
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  config.development = {
    ignoreDirs: ['web'],
    watchDirs: ['public']
  }

  config.static = {
    dir: [path.join(appInfo.baseDir, 'app/public')]
  }

  config.mysql = {
    client: {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: ""
    },
    app: true
  }

  config.jybsqlserver = {
      oa: {
        server: '',
        port: 1433,
        user: '',
        password: '',
        database: ""
      }
  }
  


  // 'userDBClient': null,  

  return config;

};
