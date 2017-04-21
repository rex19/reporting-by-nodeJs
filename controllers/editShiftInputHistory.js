/**
 * Created by rex.ni on 2016/12/12.
 */
const ShiftInputHistory  = require('../proxy').ShiftInputHistory;
const logger = require('../common/logger');


exports.show = function(req,res){
    //res.send('ok');
    res.render('editShiftInputHistory');
    // reportingM.getreportingM(function(err,data){
    //     if(err) logger.error(err);
    //     res.send(data);
    // });
};



//处理发送过来的信息 post  req.body.name
exports.update = function(req, res, next) {
    //console.log(req.body);
    var id = req.body.id;
    var lineId = req.body.lineId;
    var shiftId = req.body.shiftId;
    var productionTimeSpan = req.body.productionTimeSpan;
    var abnormalProductionTimeSpan = req.body.abnormalProductionTimeSpan;
    var cycleTime = req.body.cycleTime;
    var waste = req.body.waste;
    var scrap = req.body.scrap;
    var ngQuantity = req.body.ngQuantity;
    var dateRecord = req.body.dateRecord.toLocaleString();
    /**
     *将view层的界面传进来的值 一一传到proxy的方法中
     */
    //console.log('id',id,lineId,output,dateTimeRecord);
    //res.send('ok');
    ShiftInputHistory.updateData({
        id:id,
        lineId:lineId,
        shiftId:shiftId,
        productionTimeSpan:productionTimeSpan,
        abnormalProductionTimeSpan:abnormalProductionTimeSpan,
        cycleTime: cycleTime,
        waste:waste,
        scrap:scrap,
        ngQuantity: ngQuantity,
        dateRecord: dateRecord,
    },function(err,result){
        if(err){

            res.send("<script>alert('保存失败');location.href='/ShiftInputHistory'</script>");
        }
        /**
         * 运行完上述方法页面自动跳转到保存成功页面
         */
        res.redirect('/SaveSucessed')
    });
}
