/**
 * Created by rex.ni on 2016/10/12.
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
        comment: '工站名'
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '类型'
    },
    lineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '线体名'
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '组名'
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '状态'
    },
    sysCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '留接口'
    },
    deviceCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '留接口'
    }
};
