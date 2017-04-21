const Sequelize = require('sequelize');


//数据模型
module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
};
