/**
 * Created by rex.ni on 2016/10/13.
 */
// const reportingM = require('../proxy/reportingM');


exports.show = function(req,res){
     //res.send('ok');
    res.render('reportingM');
    // reportingM.getreportingM(function(err,data){
    //     if(err) logger.error(err);
    //     res.send(data);
    // });
}
