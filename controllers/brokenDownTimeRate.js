/**
 * Created by rex.ni on 2016/11/7.
 */
const ReportingUIApp = require('../proxy/ReportingUIApp');

exports.show = function(req, res) {
    //var id = req.
    var IdA = req.params.id1;
    var IdB = req.params.id2;

    ReportingUIApp.getDayOutput({
        idA :IdA,
        idB :IdB

    }, function (err, data) {

        var arr1Y = [];
        var arr1X = [];
        var arr2Y = [];
        var arr2X = [];

        for (var j = 0; j < data.result1.length; j++) {
            // console.log(data.result1[j].performanceRate*100);
            arr1Y.push(data.result1[j].brokenDownTimeRate*100);
            arr1X.push("'"+data.result1[j].dateTimeRecord.toLocaleDateString()+"'");
        }
        for (var i = 0; i < data.result2.length; i++) {
            // console.log(data.result2[i].performanceRate*100);
            arr2Y.push(data.result2[i].brokenDownTimeRate*100);
            arr2X.push("'"+data.result2[i].dateTimeRecord.toLocaleDateString()+"'");
        }

        //title
        if(IdA >2){
            var title = IdA-1;
        }else {
            var title = IdA;
        }

        // res.send(arr1X+" "+arr1Y+" "+arr2X+" "+arr2Y);
        res.render('brokenDownTimeRate', {
            data1y: arr1Y,
            data1x: arr1X,
            data2y: arr2Y,
            data2x: arr2X,
            title:title
        });
    });
};