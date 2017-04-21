/**
 * Created by rex.ni on 2016/10/30.
 */

const ProductDayOutput = require('../models').ProductDayOutput;
const ExtStationStatusRecord  = require('../models').ExtStationStatusRecord;

//当月数据图表获取
exports.getDayOutput = function (obj,cb) {
    var lineA = obj.idA;
    var lineB = obj.idB;
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    //var day = new Date().getDate();

    var MonthBengin = new Date(year, month, 1, 0, 0, 0).toLocaleString();


    ProductDayOutput.findAll({
        where: {
            dateTimeRecord: {
                //lt： 小于,gt :大于
                $gt: MonthBengin
            },
            lineId: lineA
        },
        order: [
            ["dateTimeRecord", "asc"]
        ]
    }).then(function (result1) {

        ProductDayOutput.findAll({
            where: {
                dateTimeRecord: {
                    //lt： 小于,gt :大于
                    $gt: MonthBengin
                },
                lineId: lineB
            },
            order: [
                ["dateTimeRecord", "asc"]
            ]
        }).then(function (result2) {
            var line = {"result1": result1, "result2": result2};

            return cb(null, line)
        }).catch(function (err) {
            return cb(err, null)
        })
    })
};


//获取Andon Status 的值
exports.getAllStationStatus = function (cb) {

    var Station1 = "";
    var arr = [];
    for(var i = 0 ; i < 20 ;i++){
        arr.push({
            "statusId":-1
        })
    }

    ExtStationStatusRecord.findAll({
        order: [
            ["bookDate", "desc"]
        ],
    }).then(function (result1) {
        //console.log(result1);

        if(result1){
            for (var i = 0; i < result1.length; i++){
                if (result1[i].stationId ==20){

                    if(arr[19].statusId == -1){
                        arr[19].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==19){

                    if(arr[18].statusId == -1){
                        arr[18].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==18){

                    if(arr[17].statusId == -1){
                        arr[17].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==17){

                    if(arr[16].statusId == -1){
                        arr[16].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==16){

                    if(arr[15].statusId == -1){
                        arr[15].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==15){

                    if(arr[14].statusId == -1){
                        arr[14].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==14){

                    if(arr[13].statusId == -1){
                        arr[13].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==13){

                    if(arr[12].statusId == -1){
                        arr[12].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==12){

                    if(arr[11].statusId == -1){
                        arr[11].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==11){

                    if(arr[10].statusId == -1){
                        arr[10].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==10){

                    if(arr[9].statusId == -1){
                        arr[9].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==9){

                    if(arr[8].statusId == -1){
                        arr[8].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==8){

                    if(arr[7].statusId == -1){
                        arr[7].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==7){

                    if(arr[6].statusId == -1){
                        arr[6].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==6){

                    if(arr[5].statusId == -1){
                        arr[5].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==5){

                    if(arr[4].statusId == -1){
                        arr[4].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==4){

                    if(arr[3].statusId == -1){
                        arr[3].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==3){

                    if(arr[2].statusId == -1){
                        arr[2].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==2){

                    if(arr[1].statusId == -1){
                        arr[1].statusId = result1[i].statusId
                    }
                }
                if (result1[i].stationId ==1){

                    if(arr[0].statusId == -1){
                        arr[0].statusId = result1[i].statusId
                    }
                }
            }
        }

        for (var i = 0 ; i<arr.length ; i ++ ){
            if(arr[i].statusId == -1){
                arr[i].statusId = 0
            }
        }
        //console.log("arr",arr)
        return cb(null,arr)
}).catch(function (err) {
    return cb(err, null)
    })
};