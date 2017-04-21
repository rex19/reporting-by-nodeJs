/**
 * Created by rex.ni on 2016/10/20.
 */
// const reportingM = require('../proxy/reportingM');


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
            arr1Y.push(data.result1[j].oee *100);
            // console.log("(data.result1[j].oee *100).toString()",(data.result1[j].oee *100).toString()+"%")
            arr1X.push("'"+data.result1[j].dateTimeRecord.toLocaleDateString()+"'");
        }
        for (var i = 0; i < data.result2.length; i++) {
            arr2Y.push(data.result2[i].oee *100 );
            arr2X.push("'"+data.result2[i].dateTimeRecord.toLocaleDateString()+"'");
        }

        //title
        if(IdA >2){
            var title = IdA-1;
        }else {
            var title = IdA;
        }

        // res.send(arr1X+" "+arr1Y+" "+arr2X+" "+arr2Y);
        res.render('oeeM', {
            data1y: arr1Y,
            data1x: arr1X,
            data2y: arr2Y,
            data2x: arr2X,
            title:title,
        });
    });
};