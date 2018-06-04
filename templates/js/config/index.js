/**
 * Created by zsq on 18-5-11.
 */
'use strict';

let product_env = require('./product');
let development_env = require('./development');
let local_env= require('./local.js');
//根据不同的NODE_ENV，输出不同的配置对象，默认输出product的配置对象
module.exports = {
  product: product_env,
  development: development_env,
  local: local_env
}[process.env.NODE_ENV || 'product'];