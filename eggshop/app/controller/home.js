'use strict';

const Controller = require('egg').Controller;
const mock = require('mockjs')
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let data =mock.mock({
        'list|5-10':[
          {
            'id|+1':1,
            'title': '@ctitle',
            'price|1-100': 1,
            'num': 1,
            'flag':false
      
          }
        ]
      })
    ctx.body = data
  }
}

module.exports = HomeController;
