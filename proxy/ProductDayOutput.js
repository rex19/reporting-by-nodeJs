/**
 * Created by rex.ni on 2016/11/7.
 */

const ProductDayOutput = require('../models').ProductDayOutput;


//  查询所有
exports.getAllProductData = function(cb) {
    ProductDayOutput.findAll({}).then(function(result) {
        //console.log("result",result);
        return cb(null, result)
    }).catch(function(err) {
        //  console.log("err",err);
        return cb(err, null)
    })
};
