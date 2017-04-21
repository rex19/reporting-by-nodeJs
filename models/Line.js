/**
 * Created by rex.ni on 2016/10/30.
 */
const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//数据模型
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '线体名'
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否正常状态'
    }
};
