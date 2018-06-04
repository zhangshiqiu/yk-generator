"use strict";

process.dir = __dirname;
process.dirconfig = __dirname + '/config';
process.dirsrc = __dirname + '/src';
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let multipart = require('connect-multiparty');
let ejs= require('ejs');
let loader= require('./loader');

// let routes = require('./routes/index');
// let users = require('./routes/users');

let app = express();

app.engine('html',ejs.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(':date[iso] :remote-addr :remote-user :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb',extended:false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart());
app.use(cors());
loader(app,{
  routesDir: process.dir+'/routes'
});
// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.render('error');
});


module.exports = app;
