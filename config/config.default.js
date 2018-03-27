'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_jyb_loan';

  // session配置，服务端保存在redis中
  config.session = {
    key: 'LOAN_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  
  config.security = {
    csrf: {
      useSession: true,
      headerName: 'x-csrf-token',
      enable: false
    }
  }

  // add your config here
  // config.middleware = ['requestParam', 'userAuth'];

  // 视图
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.nj': 'nunjucks',
    },
    noCache: true,
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };

  return config;
};
