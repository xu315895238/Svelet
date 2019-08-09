'use strict';
const fs = require('fs')
const Controller = require('egg').Controller;
const mock = require('mockjs')
class HomeController extends Controller {
  async add() {
    let data = require('../public/shop.json')
    const { ctx } = this;
    console.log(this)
    ctx.body = data
  }
  async del() {
    let data = require('../public/shop.json')


    const { ctx } = this;
    ctx.body = data
  }
  async get() {
    let data = require('../public/shop.json')


    const { ctx } = this;
    ctx.body = data
  }

}

module.exports = HomeController;
