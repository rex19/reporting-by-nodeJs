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
    bookDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isProcessed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "0"
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
};