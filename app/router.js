'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  // 用户相关
  router.post('/user', controller.user.user.updateOa2User);
  router.post('/portal', controller.user.user.updatePortal2User);

  // router.post('/user/userType', controller.user.list.setUserType);
  // router.post('/plan/reduceStageItem', controller.plan.planList.reduceStageFee);
};
