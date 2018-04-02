'use strict';
const mssql = require('mssql')

module.exports = app => {
  // 挂载 strategy

  app.beforeStart(async () => {
    // 第一次任务
    // await app.runSchedule('updateOa2User');
    // 第二次任务
    await app.runSchedule('updatePortal2User');
  });

  mssql.on('error', err => {
    console.log('database err', err)
    app.logger.error(err);
    // ... error handler
  })
};
