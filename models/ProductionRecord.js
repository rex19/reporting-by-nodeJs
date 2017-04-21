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
    startTime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    cycleTime: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    passQty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    failQty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recordDatetime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    recordWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};