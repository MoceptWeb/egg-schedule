'use strict';
const mssql = require('mssql')

module.exports = app => {
  // 挂载 strategy

  app.beforeStart(async () => {
    // await app.runSchedule('updateOa2User');updatePortal2User
    await app.runSchedule('updatePortal2User');
  });

  mssql.on('error', err => {
    console.log('database err', err)
    app.logger.error(err);
    // ... error handler
  })
};
