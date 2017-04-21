/**
 * Created by rex.ni on 2016/12/12.
 */
/**
 * Created by rex.ni on 2016/11/8.
 */
// const ProdcutionRecord = require('../models').ProductionRecord;
const ProductShiftInput = require('../models').ProductShiftInput;

//查询产量
exports.findShiftInput = function (obj,cb) {
    if(obj!=null) {

        ProductShiftInput.findAndCountAll({
            where: {
                dateRecord: {
                    lte: obj.endTime,
                    gte: obj.startTime,
                },
                deleted:false,
                lineId:obj.lineId
            },
            order: [
                ["dateRecord", "asc"]
            ],
            offset:(obj.page-1)*10,
            limit: 10

        }).then(function (result) {
            // console.log("Proxy result",result);
            return cb(null, result)
        }).catch(function (err) {
            return cb(err, null)
        })
    }
};


//根据ID 先查询，后修改
exports.findShiftInputData = function (obj,cb) {
    if(obj!=null) {

        ProductShiftInput.findAll({
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
        ProductShiftInput.update({
            lineId: obj.lineId,
            shiftId: obj.shiftId,
            productionTimeSpan: obj.productionTimeSpan,
            abnormalProductionTimeSpan: obj.abnormalProductionTimeSpan,
            cycleTime: obj.cycleTime,
            waste:obj.waste,
            scrap:obj.scrap,
            ngQuantity: obj.ngQuantity,
            dateRecord: obj.dateRecord,
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
        ProductShiftInput.update({
            deleted:true
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
