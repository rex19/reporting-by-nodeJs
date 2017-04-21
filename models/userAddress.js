/**
 * Created by rex.ni on 2016/10/29.
 */
const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//数据模型
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        comment: '主键'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        comment: '用户Id'
    },
    consignee: {
        type: DataTypes.STRING,
        field: 'consignee',
        allowNull: false,
        comment: '收货人'
    },
    address: {
        type: DataTypes.STRING(1024),
        field: 'address',
        allowNull: false,
        comment: '详细地址'
    },
    zipCode: {
        type: DataTypes.STRING(16),
        field: 'zip_code',
        allowNull: true,
        comment: '邮编'
    },
    tel: {
        type: DataTypes.STRING(32),
        field: 'tel',
        allowNull: false,
        comment: '电话'
    },
};
