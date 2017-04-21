/**
 * Created by rex.ni on 2016/12/13.
 */
var Sequelize = require('sequelize');
var DataTypes = require('sequelize').DataTypes;
var schedule = require("node-schedule");

var ExtStaionStatusRecord = require('./models/index').ExtStationStatusRecord;
var DowntimeRecord = require('./models/index').DowntimeRecord;


var ProcessDowntimeRecord = async function () {
    try {
        var extStaionStatusRecords = await getExtStaionStatusRecords();
        if (extStaionStatusRecords != null) {
            for (var i=0;i< extStaionStatusRecords.length;i++) {
                var id1 = extStaionStatusRecords[i].id;
                var stationId = extStaionStatusRecords[i].stationId;
                var startTime = extStaionStatusRecords[i].bookDate;
                if (extStaionStatusRecords[i].statusId == 0) {
                    var update1 = await updateIsProcessed(id1);
                    continue;
                }
                var nextRecordList = await getNextRecord(stationId, startTime);
                if (nextRecordList!= 0) {
                    await updateIsProcessed(id1);
                    var id2 = nextRecordList[0].id;
                    var statusId = extStaionStatusRecords[i].statusId;
                    var endTime = nextRecordList[0].bookDate;
                    var recordDatetime = new Date().toLocaleString();
                    var insert = await InsertDowntimeRecord(stationId, statusId, startTime, endTime, recordDatetime);
                    if (nextRecordList[0].statusId == 0) {
                        var update3 = await updateIsProcessed(id2);
                    }
                } else if(nextRecordList == 0){
                    continue;
                }
            }
        }else if(extStaionStatusRecords == null) {
            console.log("没有要处理的ProcessDowntimeRecord");
        }
    }catch(err){
        console.log("ProcessDowntimeRecordError",err)
    }
};


//定时运行
var rule = new schedule.RecurrenceRule();
var times = [1,30];
rule.minute = times;

var c=0;
var j = schedule.scheduleJob(rule, function(){
    c++;
    console.log(c,"ProcessDownTimeRecord Successed");
    ProcessDowntimeRecord();
});



//查询出接口表ExtStaionStatusRecord 没处理过的记录 List
function getExtStaionStatusRecords() {
    return ExtStaionStatusRecord.findAll({
        where: {
            isProcessed: false
        },
        order: [
            ['bookDate', 'ASC']
        ]
    })
}

//update 接口表中 Isprocessed字段
function updateIsProcessed(id) {
    return ExtStaionStatusRecord.update({
        isProcessed: 1
    }, {
        where: {
            id: id
        }
    })
}

//取得nextRecord List（结束时间）
function getNextRecord(stationId, startTime) {
    return ExtStaionStatusRecord.findAll({
        where: {
            stationId: stationId,
            bookDate: {
                gt: startTime
            }
        }
    })
}

//将数据Insert到DowntimeRecord表中
function InsertDowntimeRecord(stationId,statusId, startTime, endTime, recordDatetime) {
    return DowntimeRecord.create({
        stationId: stationId,
        shiftId: 1,
        statusId: statusId,
        startTime:startTime,
        endTime: endTime,
        recordDatetime: recordDatetime,
    })
}
