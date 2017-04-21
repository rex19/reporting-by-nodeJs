const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//数据模型
module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '角色Id'
  },
  roleName: {
    type: DataTypes.STRING,
    field: 'role_name',
    comment: '角色名'
  }
};
