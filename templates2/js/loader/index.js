/**
 * Created by zsq on 18-5-11.
 */
'use strict';

const loader= require('./loader.js');
const path= require('path');

module.exports= function (app,options) {
  if (!options.routesDir) {
    options.routesDir = path.join(process.cwd(), "routes");
  }
  if (options.routesDir) {
    loader.loadDirectory(options.routesDir, app,'',options);
  } else {
    console.log('请指定正确的路由文件地址');
    process.exit('1');
  }
};
