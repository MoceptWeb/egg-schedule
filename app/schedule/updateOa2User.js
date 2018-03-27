'use strict';

const Subscription = require('egg').Subscription;

class TaskPortal extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '525600m', // 1 年间隔
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    this.ctx.logger.info('schedule updateOa2User begin')
    const res = await this.ctx.service.portal.oa.updateOa2User();
    this.ctx.logger.info('schedule updateOa2User finish')
    // this.app.messenger.sendToApp('test_action', {s: 'sss'});
  }
}

module.exports = TaskPortal;