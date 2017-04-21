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
        unique: true
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        unique: true,
        references: {
            model: 'user',
            key: 'id'
        },
        comment: '用户Id'
    },
    loginIp: {
        type: DataTypes.STRING,
        field: 'login_ip',
        allowNull: false,
        defaultValue: '',
        validate: {
            isIP: true
        },
        comment: '登录IP'
    }
};
