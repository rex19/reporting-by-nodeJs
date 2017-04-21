/**
 * Created by rex.ni on 2016/11/18.
 */
const history  = require('../proxy').history;
const logger = require('../common/logger');


exports.show = function(req,res){
    //res.send('ok');
    res.render('EditHistory');
    // reportingM.getreportingM(function(err,data){
    //     if(err) logger.error(err);
    //     res.send(data);
    // });
};



//处理发送过来的信息 post  req.body.name
exports.update = function(req, res, next) {
    console.log(req.body);
      var id = req.body.id;
    var lineId = req.body.lineId;
    var output = req.body.output;
    var passRate = req.body.passRate;
    var brkenDownTimeRate = req.body.brkenDownTimeRate;
    var performanceRate = req.body.performanceRate;
    var timeRate = req.body.timeRate;
    var oee = req.body.oee;
    var dateTimeRecord = req.body.dateTimeRecord.toLocaleString();
    /**
     *将view层的界面传进来的值 一一传到proxy的方法中
     */
    //console.log('id',id,lineId,output,dateTimeRecord);
    //res.send('ok');
    history.updateData({
        id:id,
        lineId:lineId,
        output:output,
        passRate:passRate,
        brkenDownTimeRate:brkenDownTimeRate,
        performanceRate: performanceRate,
        timeRate: timeRate,
        oee: oee,
        dateTimeRecord: dateTimeRecord,
        isProcessed:0,
        deleted:0
    },function(err,result){
        if(err){

            res.send("<script>alert('保存失败');location.href='/history'</script>");
        }
        /**
         * 运行完上述方法页面自动跳转到保存成功页面
         */
        res.redirect('/SaveSucessed')
    });
}
