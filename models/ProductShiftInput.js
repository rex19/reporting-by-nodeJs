/**
 * Created by rex.ni on 2016/10/30.
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
        allowNull:false
    },
    shiftId:{
        type:DataTypes.INTEGER,
        allowNull:false,

    },
    productionTimeSpan:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    abnormalProductionTimeSpan:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    cycleTime:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    waste:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    scrap:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    ngQuantity:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    dateRecord:{
        type:DataTypes.DATE,
        allowNull:false
    },
    isProcessed:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        // defaultValue: "0"
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
}