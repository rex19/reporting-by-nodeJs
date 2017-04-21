const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');



const log4js = require('./common/logger');

//引入路由
const routes = require('./routes/index');
const users = require('./routes/users');
const mainInterface = require('./routes/mainInterface');
const reportingM = require('./routes/reportingM');
const outputM = require('./routes/outputM');
const cycletimeM = require('./routes/cycletimeM');
const oeeM = require('./routes/oeeM');
const history = require('./routes/history');
const productShiftInput = require('./routes/productShiftInput');
const catalog =require('./routes/catalog');
const performanceRate =require('./routes/performanceRate');
const brokenDownTimeRate =require('./routes/brokenDownTimeRate');
const passRate =require('./routes/passRate');
const timeRate =require('./routes/timeRate');
const saveSucessed =require('./routes/saveSucessed');
const editHistory = require('./routes/editHistory');
const shiftInputHistory = require('./routes/shiftInputHistory');
const editShiftInputHistory = require('./routes/editShiftInputHistory');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

//development
app.use(errorhandler());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//设置路由
app.use('/', routes);
app.use('/users', users);
app.use('/mainInterface',mainInterface);
app.use('/reportingM',reportingM);
app.use('/outputM',outputM);
app.use('/cycletimeM',cycletimeM);
app.use('/oeeM',oeeM);
app.use('/history', history);
app.use('/productShiftInput', productShiftInput);
app.use('/catalog',catalog);
app.use('/performanceRate',performanceRate);
app.use('/brokenDownTimeRate',brokenDownTimeRate);
app.use('/passRate',passRate);
app.use('/timeRate',timeRate);
app.use('/SaveSucessed',saveSucessed);
app.use('/EditHistory',editHistory);
app.use('/shiftInputHistory',shiftInputHistory);
app.use('/editShiftInputHistory',editShiftInputHistory)

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = false;
//app.locals._layoutFile = 'layout.html';

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
