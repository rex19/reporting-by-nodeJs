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
    stationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shiftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    recordDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
};
