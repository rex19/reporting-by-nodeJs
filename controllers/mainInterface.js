/**
 * Created by rex.ni on 2016/11/5.
 */
const ReportingUIApp = require('../proxy').ReportingUIApp;
const ShiftOutput = require('../proxy').ShiftOutput;

exports.show = function(req,res){
    res.render('mainInterface');

};



//获取andon 状态 AJAX到前台
exports.andon = function(req, res, next) {


    var arrStatus = [];
    var arrStationStatus = [];

    ReportingUIApp.getAllStationStatus( function (err, result) {
        //console.log(result);
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                arrStatus.push(result[i].statusId);
            }
           // console.log(arrStatus);

                arrStationStatus.push({
                    "Station1": arrStatus[0],
                    "Station2": arrStatus[1],
                    "Station3": arrStatus[2],
                    "Station4": arrStatus[3],
                    "Station5": arrStatus[4],
                    "Station6": arrStatus[5],
                    "Station7": arrStatus[6],
                    "Station8": arrStatus[7],
                    "Station9": arrStatus[8],
                    "Station10": arrStatus[9],
                    "Station11": arrStatus[10],
                    "Station12": arrStatus[11],
                    "Station13": arrStatus[12],
                    "Station14": arrStatus[13],
                    "Station15": arrStatus[14],
                    "Station16": arrStatus[15],
                    "Station17": arrStatus[16],
                    "Station18": arrStatus[17],
                    "Station19": arrStatus[18],
                    "Station20": arrStatus[19],
                });
            //console.log("arrStationStatus",arrStationStatus);
            res.send(arrStationStatus);
        } else {
            console.log("没有查询到机床状态");
            res.send("0");
        }
    })
};


//排班A方法
exports.shiftA =function(req,res,next){

    var AarrShift = [];

    ShiftOutput.getShiftAOutput(function (err,result) {
        if (result[0].length != 0) {
            console.log("result[0]",result[0]);
            AarrShift.push({
                //早班
                "Line1A1": result[0].Line1A1,
                "Line2A1": result[0].Line2A1,
                "Line3A1": result[0].Line3A1,
                "Line4A1": result[0].Line4A1,
                //中班
                "Line1A2": result[0].Line1A2,
                "Line2A2": result[0].Line2A2,
                "Line3A2": result[0].Line3A2,
                "Line4A2": result[0].Line4A2,
                //晚班
                "Line1A3": result[0].Line1A3,
                "Line2A3": result[0].Line2A3,
                "Line3A3": result[0].Line3A3,
                "Line4A3": result[0].Line4A3
            });
            res.send(AarrShift);
        }else {
            console.log("没有A班产量数据");
            res.send("0");
        }
    })
};



//排班B方法
exports.shiftB =function(req,res,next){

    var BarrShift = [];

    ShiftOutput.getShiftBOutput(function (err,result) {
        if (result[0].length != 0) {
            console.log("result[0]",result[0]);
            BarrShift.push({
                //早班
                "Line1B1": result[0].Line1B1,
                "Line2B1": result[0].Line2B1,
                "Line3B1": result[0].Line3B1,
                "Line4B1": result[0].Line4B1,
                //晚班
                "Line1B3": result[0].Line1B3,
                "Line2B3": result[0].Line2B3,
                "Line3B3": result[0].Line3B3,
                "Line4B3": result[0].Line4B3
            });
            res.send(BarrShift);
        }else {
            console.log("没有B班产量数据");
            res.send("0");
        }
    })
};


//排班B方法
exports.shiftC =function(req,res,next){

    var CarrShift = [];

    ShiftOutput.getShiftCOutput(function (err,result) {
        if (result[0].length != 0) {
            //console.log("result[0]",result[0]);
            CarrShift.push({
                //早班
                "Line1C1": result[0].Line1C1,
                "Line2C1": result[0].Line2C1,
                "Line3C1": result[0].Line3C1,
                "Line4C1": result[0].Line4C1,
                //晚班
                "Line1C3": result[0].Line1C3,
                "Line2C3": result[0].Line2C3,
                "Line3C3": result[0].Line3C3,
                "Line4C3": result[0].Line4C3
            });
            res.send(CarrShift);
        }else {
            console.log("没有C班产量数据");
            res.send("0");
        }
    })
};
