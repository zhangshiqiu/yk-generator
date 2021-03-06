/**
 * Created by TOSHIBA on 2018/5/26.
 */
"use strict";
process.dir = __dirname;
process.dirconfig = __dirname + '/config';
process.dirsrc = __dirname + '/src';
const Koa= require('koa');

const bodyParser = require('koa-bodyparser');
const path = require('path');
const logger = require('koa-morgan');
const koaStatic = require('koa-static');
const views= require('koa-views');
const loader= require('./loader');
const app= new Koa();

app.use(bodyParser());

app.use(koaStatic(path.join(process.dir,'public')));

app.use(views(__dirname+'/view',{ extension: 'html' }));

app.use(logger(':date[iso] :remote-addr :remote-user :method :url :status :response-time ms - :res[content-length]'));
app.use(async (ctx,next) => { //里面抛出异常捕获
    try{
      await next();
    }catch (err){
     console.log(err);
    }
});
loader(app,{
    routesDir: process.dir+'/routes'
});



module.exports= app;