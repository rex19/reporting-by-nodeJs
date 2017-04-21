/**
 * Created by rex.ni on 2016/11/3.
 */
//引入业务逻辑proxy层
const ProductShiftInput  = require('../proxy').ProductShiftInput;
const logger = require('../common/logger');

/**
 * //暴露出show方法
 * @param req =request  请求
 * @param res =response 回复
 */
exports.show = function(req,res){
    //render出View层的界面
    res.render('productShiftInput');
}

//处理发送过来的信息 post  req.body.name
exports.addInput = function(req, res, next) {
    var lineId = req.body.lineId;
    var shiftId = req.body.shiftId;
    var productionTimeSpan = req.body.productionTimeSpan;
    var abnormalProductionTimeSpan = req.body.abnormalProductionTimeSpan;
    var cycleTime = req.body.cycleTime;
    var waste = req.body.waste;
    var scrap = req.body.scrap;
    var ngQuantity = req.body.ngQuantity;
    var dateRecord = req.body.dateRecord;
    console.log("req________________________________",req.body.waste,req.body)
    /**
     *将view层的界面传进来的值 一一传到proxy的方法中
     */
    ProductShiftInput.addProductShiftInput({
        lineId:lineId,
        shiftId:shiftId,
        productionTimeSpan: productionTimeSpan,
        abnormalProductionTimeSpan:abnormalProductionTimeSpan,
        cycleTime: cycleTime,
        waste:waste,
        scrap:scrap,
        ngQuantity:ngQuantity,
        dateRecord:dateRecord,
    },function(err,data){
        if(err){
            // console.log("lineId",lineId,"shiftId",shiftId,"productionTimeSpan",productionTimeSpan,"abnormalProductionTimeSpan",abnormalProductionTimeSpan,"cycleTime",cycleTime,"ngQuantity",ngQuantity,"dateRecord",dateRecord)
            res.send("<script>alert('保存失败');location.href='/productShiftInput'</script>");
            //res.send("<script>alert('保存失败');location.href='/productShiftInput'</script>");
            console.log("error code",err)
        }
        /**
         * 运行完上述方法页面自动跳转到保存成功页面
         */
        res.redirect('/SaveSucessed')
    });
    //res.send("ok")
}
