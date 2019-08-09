'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/shop/add', controller.shop.add);
  router.get('/shop/del', controller.shop.del);
  router.get('/shop/get', controller.shop.get);
};
