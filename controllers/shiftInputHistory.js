/**
 * Created by rex.ni on 2016/11/2.
 */

const User  = require('../proxy').User;
const logger = require('../common/logger');
const ProductDayOutput = require('../proxy').ProductDayOutput;
const ProductShiftInput = require('../proxy').ProductShiftInput;
const ShiftInputHistory = require('../proxy').ShiftInputHistory;

exports.show = function(req, res, next) {
    //res.send('ok');
    User.getAllUser(function(err,data){
        if(err) logger.error(err);
        //res.send(data);
        res.render('ShiftInputHistory',{"result":data});
    });
};


exports.list = function (req,res,next) {

    ShiftInputHistory.findShiftInput(function (err,data) {
        if(err) logger.error(err);
        //res.send(data);
        res.render('ShiftInputHistory',{"result":data});
    })
};



//处理历史页面提交的数据
exports.shiftInputHanderData = function(req, res, next) {
    //console.log("req",req.query.startTime);
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    var lineId = req.query.lineId;
    var page = req.query.page ? req.query.page : 1;

    ShiftInputHistory.findShiftInput({
        startTime:startTime,
        endTime:endTime,
        page:page,
        lineId:lineId,

    },function (err,result) {
        //res.send(result);
        console.log("startTime,endTime,page,lineId",startTime,endTime,page,lineId);
        var arrId = [];
        var arrLineId = [];
        var arrShiftId = [];
        var arrProductionTimeSpan = [];
        var arrAbnormalProductionTimeSpan = [];
        var arrCycleTime = [];
        var arrWaste = [];
        var arrScrap = [];
        var arrNgQuantity = [];
        var arrdateRecord = [];
        // console.log("result",result);
        // console.log("result.rows.length",result.rows.length);
        // console.log("result.rows[i].lineId",result.rows[i].lineId);

        if(result.rows.length > 0) {

            // console.log("result.rows.length > 0");
            for (var i = 0; i < result.rows.length; i++) {
                var line = "";
                if(result.rows[i].lineId==1){
                    line ="1(A)";
                }else if(result.rows[i].lineId ==2){
                    line = "1(B)"
                }else if(result.rows[i].lineId==3){
                    line = "2(A)"
                }else if(result.rows[i].lineId==4){
                    line ="2(B)"
                }
                arrLineId.push(line);
                arrId.push(result.rows[i].id);
                arrShiftId.push(result.rows[i].shiftId);
                arrProductionTimeSpan.push(result.rows[i].productionTimeSpan);
                arrAbnormalProductionTimeSpan.push(result.rows[i].abnormalProductionTimeSpan);
                arrCycleTime.push(result.rows[i].cycleTime);
                arrWaste.push(result.rows[i].waste);
                arrScrap.push(result.rows[i].scrap);
                arrNgQuantity.push(result.rows[i].ngQuantity);
                arrdateRecord.push(result.rows[i].dateRecord.toLocaleString());
            }
            // res.send(arrLineId+" "+arrOutput+" "+arrTimeRate+" "+arrPassRate+" "+arrOee+" "+arrPerformanceRate+" "+arrDateTimeRecord)
            var arr =[] ;
            for (var j = 0; j < result.rows.length; j++) {
                arr.push({
                    "id":arrId[j],
                    "lineId": arrLineId[j],
                    "shiftId": arrShiftId[j],
                    "productionTimeSpan": arrProductionTimeSpan[j],
                    "abnormalProductionTimeSpan": arrAbnormalProductionTimeSpan[j],
                    "cycleTime": arrCycleTime[j],
                    "waste":arrWaste[j],
                    "scrap":arrScrap[j],
                    "ngQuantity": arrNgQuantity[j],
                    "dateRecord": arrdateRecord[j],
                })
            }
            res.send({
                count:Math.ceil(result.count/10),
                data:arr
            });
        }else{
            console.log("没有查到该日期内的历史记录");
            res.send("0");
        }
    })
};


//根据id 修改
exports.EditShiftInputHistory = function(req, res, next) {
    //res.send('ok');
    console.log("id",req.params.id);

    //res.send('ok');
    //  console.log("req",req.params.id);
    ShiftInputHistory.findShiftInputData({id:req.params.id},function(err,data){
        // console.log("data",data);
        // var result = [];
        // result.push(data[0].output);
        //console.log("data",data[0]);
        if(err){
            res.send("fail")
        }
        res.render("editShiftInputHistory",{data:data[0]});

    })
};





//根据id 删除
exports.delete = function(req, res, next) {
    //rs.send('ok');
    console.log("id",req.params.id);

    //res.render('newsadd');
    //  console.log("req",req.params.id);
    ShiftInputHistory.deleteData({id:req.params.id},function(err,data){
        if(err){
            res.send("fail")
        }
        //res.redirect('/news/list')
        res.send("ok")
    })
};

