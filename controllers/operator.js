/**
 * Created by rex.ni on 2016/11/2.
 */
const User  = require('../proxy').User;

const ProductShiftInput  = require('../proxy').ProductShiftInput;
const logger = require('../common/logger');

exports.show = function(req, res, next) {
    //res.send('ok');
    User.getAllUser(function(err,data){
        if(err) logger.error(err);
        //res.send(data);
        res.render('operator',{"result":data});
    });
}

//新闻列表
exports.list = function(req, res, next) {
    //res.send("ok");

    User.getAllUser(function(err,data){
        if(err) logger.error(err);
        //res.send(data);
        res.render('newslist',{"result":data});
    });
}

//添加新闻
exports.add = function(req, res, next) {
    res.render('newsadd');
}

//id 删除新闻
exports.delete = function(req, res, next) {
    //res.render('newsadd');
    //  console.log("req",req.params.id);
    User.deleteUser({id:req.params.id},function(err,data){
        if(err) logger.error(err);
        res.redirect('/news/list')
    })
    //res.send("ok")
}



//处理发送过来的信息 post  req.body.name
exports.newsadd = function(req, res, next) {
    console.log('ok');
    //console.log("req",req.body.username);
    var username = req.body.username;
    var pwd = req.body.password;

    User.addUserAndRole({
        username:username,
        pwd:pwd
    },function(err,data){
        if(err) logger.error(err);
        res.redirect('/history')
        //res.send("ok");
    });

    //res.send("ok")
}

    //处理发送过来的信息 post  req.body.name
exports.addInput = function(req, res, next) {
    //console.log("req",req.body.username);
    //res.send('ok');
    console.log('okle ');

    var lineId = req.body.lineId;
    var shiftId = req.body.shiftId;
    var productionTimeSpan = req.body.productionTimeSpan;
    var abnormalProductionTimeSpan = req.body.abnormalProductionTimeSpan;
    var cycleTime = req.body.cycleTime;
    var ngQuantity = req.body.ngQuantity;

    ProductShiftInput.addProductShiftInput({
        lineId: lineId,
        shiftId: shiftId,
        productionTimeSpan: productionTimeSpan,
        abnormalProductionTimeSpan: abnormalProductionTimeSpan,
        cycleTime: cycleTime,
        ngQuantity: ngQuantity,
    }, function (err, data) {
        if (err) logger.error(err);
        res.redirect('/news/list')
        //res.send("ok");
        console.log('ok2 ');
    })

}