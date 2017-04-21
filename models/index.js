const Sequelize = require('sequelize');
//连接mysql
const sequelize = new Sequelize('waxberryTest', 'root', '1qaz@wsx', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone:"+08:00",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

/*
//连接SqlServer数据库
const sequelize = new Sequelize('waxberry_db', 'sa', '123123', {
  host: 'localhost',
  dialect: 'mssql',
  port: 54632,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/

// test connect
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

exports.User =  sequelize.define('user',require('./user'));

exports.Product =  sequelize.define('product',require('./product'));

exports.Line = sequelize.define('line',require('./Line'));

exports.Station = sequelize.define('station',require('./Station'));

exports.ExtStationStatusRecord = sequelize.define('ExtStationStatusRecord',require('./ExtStationStatusRecord'));
//
exports.ExtProductionRecord = sequelize.define('ExtProductionRecord',require('./ExtProductionRecord'));
//
exports.ProductionRecord = sequelize.define('ProductionRecord',require('./ProductionRecord'));
//
exports.DowntimeRecord = sequelize.define('DowntimeRecord',require('./DowntimeRecord'));
//
exports.ProductShiftInput = sequelize.define('ProductShiftInput',require('./ProductShiftInput'));

exports.ProductDayOutput = sequelize.define('ProductDayOutput',require('./ProductDayOutput'));

//{ force: true }   每次都会删之前的表
//sequelize.sync({ force: true }); 
sequelize.sync();
