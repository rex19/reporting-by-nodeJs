/**
 * Created by rex.ni on 2016/11/3.
 */
const sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

//数据模型
module.exports = {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    lineId:{
        type:DataTypes.INTEGER,
        // foreignKey: 'shift_id',
        allowNull:false
    },
    output:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    passRate:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    brokenDownTimeRate:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    performanceRate:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    timeRate:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    oee:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    dateTimeRecord:{
        type:DataTypes.DATE,
        allowNull:false
    },
    isProcessed:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    deleted:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}

