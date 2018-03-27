'use strict';
//  npm run test-local --full-trace ./test/app/service/shell/test.test.js  --env=sit
const assert = require('assert');
const mock = require('egg-mock');

describe('test/service/portal/portal.test.js', () => {
  let app;
  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app();
    // 等待 app 启动成功，才能执行测试用例
    return app.ready();
  });
  afterEach(mock.restore);

  describe('service test', () => {
    it('service should start task test', async () => {
      
      const ctx = app.mockContext();
      const data = await ctx.service.portal.portal.updatePortal2User();
      console.log(data);
      assert(data);
      assert(data === 'aa');
    });
  });
});
