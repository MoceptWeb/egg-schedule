'use strict';
const path = require('path');
// had enabled by egg
// exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// MYSQL数据库
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

/* exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
}; */


