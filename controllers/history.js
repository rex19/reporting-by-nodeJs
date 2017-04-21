/**
 * Created by rex.ni on 2016/11/2.
 */

const User  = require('../proxy').User;
const logger = require('../common/logger');
const ProductDayOutput = require('../proxy').ProductDayOutput;
const History = require('../proxy').history;

exports.show = function(req, res, next) {
    //res.send('ok');
    User.getAllUser(function(err,data){
        if(err) logger.error(err);
        //res.send(data);
        res.render('history',{"result":data});
    });
};


exports.list = function (req,res,next) {

    ProductDayOutput.findOutput(function (err,data) {
        if(err) logger.error(err);
        //res.send(data);
        res.render('history',{"result":data});
    })
};



//处理历史页面提交的数据
exports.handerData = function(req, res, next) {
    //console.log("req",req.query.startTime);
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    var lineId = req.query.lineId;
    var page = req.query.page ? req.query.page : 1;

    //  console.log("startTime",startTime);
    //  console.log("endTime",endTime);

    //console.log("page",page);

    History.findOutput({
        startTime:startTime,
        endTime:endTime,
        page:page,
        lineId:lineId
    },function (err,result) {
        //res.send(result);
        var arrId = [];
        var arrLineId = [];
        var arrOutput = [];
        var arrTimeRate = [];
        var arrPassRate = [];
        var arrOee = [];
        var arrPerformanceRate = [];
        var arrBrokenDownTimeRate = [];
        var arrDateTimeRecord = [];
        //console.log("result",result.length);
        console.log("result.rows.length",result.rows.length);

        if(result.rows.length > 0) {


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
                arrOutput.push(result.rows[i].output);
                arrTimeRate.push(result.rows[i].timeRate*100+"%");
                arrPassRate.push(result.rows[i].passRate*100+"%");
                arrOee.push(result.rows[i].oee*100+"%");
                arrPerformanceRate.push(result.rows[i].performanceRate*100+"%");
                arrBrokenDownTimeRate.push(result.rows[i].brokenDownTimeRate*100+"%");
                arrDateTimeRecord.push(result.rows[i].dateTimeRecord.toLocaleString());
            }
            // res.send(arrLineId+" "+arrOutput+" "+arrTimeRate+" "+arrPassRate+" "+arrOee+" "+arrPerformanceRate+" "+arrDateTimeRecord)
            var arr =[] ;
            for (var j = 0; j < result.rows.length; j++) {
                arr.push({
                    "id":arrId[j],
                    "lineId": arrLineId[j],
                    "output": arrOutput[j],
                    "timeRate": arrTimeRate[j],
                    "passRate": arrPassRate[j],
                    "oee": arrOee[j],
                    "performanceRate": arrPerformanceRate[j],
                    "brokenDownTimeRate": arrBrokenDownTimeRate[j],
                    "dateTimeRecord": arrDateTimeRecord[j]
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
exports.EditHistory = function(req, res, next) {
    //rs.send('ok');
    console.log("id",req.params.id);

    //res.send('ok');
    //  console.log("req",req.params.id);
    History.findData({id:req.params.id},function(err,data){
        // console.log("data",data);
        // var result = [];
        // result.push(data[0].output);
        console.log("data",data[0]);
        if(err){
            res.send("fail")
        }
        res.render("EditHistory",{data:data[0]});

    })
};





//根据id 删除
/*exports.delete = function(req, res, next) {
    //rs.send('ok');
    console.log("id",req.params.id);

    //res.render('newsadd');
    //  console.log("req",req.params.id);
    History.deleteData({id:req.params.id},function(err,data){
        if(err){
            res.send("fail")
        }
        //res.redirect('/news/list')
        res.send("ok")
    })
};*/
exports.delete = function(req, res, next) {
    //rs.send('ok');
    console.log("id",req.params.id);

    //res.render('newsadd');
    //  console.log("req",req.params.id);
    History.deleteData({id:req.params.id},function(err,data){
        if(err){
            res.send("fail")
        }
        //res.redirect('/news/list')
        res.send("ok")
    })
};
