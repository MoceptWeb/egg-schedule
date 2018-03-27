'use strict';

const Controller = require('egg').Controller;




class UserController extends Controller {
  // async getUserList() {
  //   const res = await this.service.portal.user.queryUserList();

  //   this.ctx.body = res;
  // }

  async updateOa2User() {
    const res = await this.service.portal.oa.updateOa2User();

    this.ctx.body = res;
  }

  async updatePortal2User() {
    const res = await this.service.portal.portal.updatePortal2User();

    this.ctx.body = res;
  }

}

module.exports = UserController;
