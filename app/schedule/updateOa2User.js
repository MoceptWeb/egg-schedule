'use strict';

const Subscription = require('egg').Subscription;

class TaskPortal extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '525600m', // 1 年间隔
      type: 'worker', // worker 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
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