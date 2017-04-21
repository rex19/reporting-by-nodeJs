/**
 * Created by rex.ni on 2016/11/8.
 */
// const ProdcutionRecord = require('../models').ProductionRecord;
const ProductDayOutput = require('../models').ProductDayOutput;

//查询产量
exports.findOutput = function (obj,cb) {
    if(obj!=null) {

        ProductDayOutput.findAndCountAll({
            where: {
                dateTimeRecord: {
                    lte: obj.endTime,
                    gte: obj.startTime,
                },
                deleted:0,
                lineId:obj.lineId
            },
            order: [
                ["dateTimeRecord", "asc"]
            ],
            offset:(obj.page-1)*10,
            limit: 10

        }).then(function (result) {
            // console.log("result",result.length)
            return cb(null, result)
        }).catch(function (err) {
            return cb(err, null)
        })
    }
};


//根据ID 先查询，后修改
exports.findData = function (obj,cb) {
    if(obj!=null) {

        ProductDayOutput.findAll({
            where: {
                id:obj.id,
            },

        }).then(function (data) {
            console.log("data",data.length)
            return cb(null, data)
        }).catch(function (err) {
            return cb(err, null)
        })
    }
};


//根据Id  update
exports.updateData = function (obj,cb) {
    console.log("obj",obj);
    if(obj!=null) {
        ProductDayOutput.update({
            lineId: obj.lineId,
            output: obj.output,
            passRate: obj.passRate,
            brkenDownTimeRate: obj.brkenDownTimeRate,
            performanceRate: obj.performanceRate,
            timeRate: obj.timeRate,
            oee: obj.oee,
            dateTimeRecord: obj.dateTimeRecord,
            isProcessed:0,
            deleted:0
        }, {
            where: {
                id: obj.id
            }
        }).then(function (result) {
            //console.log('updated Data');
            //console.log(result);
            return cb(null, result)
        }).catch(function (err) {
            return cb(err, null)
        })
    }
};


//根据id删除(update deleted字段)
exports.deleteData = function (obj,cb) {
    //console.log("obj",obj);
    if(obj!=null) {
        ProductDayOutput.update({
            deleted:1
        }, {
            where: {
                id: obj.id
            }
        }).then(function (result) {
            //console.log('updated Data');
            //console.log(result);
            return cb(null, result)
        }).catch(function (err) {
            return cb(err, null)
        })
    }
};
/*
exports.deleteData = function(obj,cb){
    ProductDayOutput.destroy({'where':{id:obj.id}}).then(function(){
        return cb(null, "OK")
    }).catch(function(err) {
        return cb(err, null)
    })
};*/
