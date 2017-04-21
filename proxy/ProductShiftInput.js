/**
 * Created by rex.ni on 2016/11/3.
 */
const ProductShiftInput = require('../models').ProductShiftInput;
const Role = require('../models').Role;




//  查询所有,可以以返回到view 层以Table形式展示
exports.getAllProductShiftInput = function(cb) {

    ProductShiftInput.findAll({}).then(function(result) {
        return cb(null, result)
    }).catch(function(err) {
        return cb(err, null)
    })
};

/**
 * 将Controllers层的数据传入到create方法 写入到数据库中
 * @param obj 传入的object
 * @param cb callback
 */
exports.addProductShiftInput = function(obj,cb) {
    // body...
    console.log("proxy");
    Promise.all([
        ProductShiftInput.create({
            lineId: obj.lineId,
            shiftId: obj.shiftId,
            productionTimeSpan: obj.productionTimeSpan,
            abnormalProductionTimeSpan: obj.abnormalProductionTimeSpan,
            cycleTime: obj.cycleTime,
            waste:obj.waste,
            scrap:obj.scrap,
            ngQuantity: obj.ngQuantity,
            dateRecord:obj.dateRecord,
            isProcessed:0,
            deleted:0
        })
        /**
         * 回调
         */
    ]).then(function(result) {
        return cb(null, result)
        /**
         * catch error
         */
    }).catch(function(err) {
        return cb(err, null)
    })
};




