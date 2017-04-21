/**
 *Createdbyrex.nion2016/10/30.
 *
 */
var Sequelize = require('sequelize');
var DataTypes = require('sequelize').DataTypes;
var schedule = require("node-schedule");

var ProductionRecord = require('./models/index').ProductionRecord;
var ExtProductionRecord = require('./models/index').ExtProductionRecord;

var d1 = new Date();
var d2 = new Date();
d2.setMonth(0);
d2.setDate(1);
var rq = d1 - d2;
var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
var s2 = Math.ceil(s1 / 7);
//console.log("今天是本年第"+s1+"天，第"+s2+"周");//周日做为下周的开始计算


var ProcessProductionRecord = async function () {
    try {
        var ExtProductionRecords = await getExtProductionRecords();
        // console.log("ExtProductionRecords.length",ExtProductionRecords.length);
        if (ExtProductionRecords != null) {
            for (var i = 0; i < ExtProductionRecords.length; i++) {
                var id = ExtProductionRecords[i].id;
                var stationId = ExtProductionRecords[i].stationId;
                var bookDate = ExtProductionRecords[i].bookDate;
                var nextRecordList = await getNextRecord(stationId, bookDate);
                if (nextRecordList.length != 0) {
                    var update = await updateIsProcessed(id);
                    var nextRecord = nextRecordList[0].bookDate;
                    var startTime = bookDate;
                    var endTime = nextRecord;
                    var cycleTime = endTime - startTime;
                    var recordDatetime = new Date().toLocaleString();
                    var recordWeek = s2;
                    //console.log("nextRecord " + nextRecord, "cycleTime " + cycleTime, "recordDatetime " + recordDatetime, "recordWeek " + recordWeek,);
                    var Insert = await InsertProductionRecord(stationId, startTime, endTime, cycleTime, recordDatetime, recordWeek);
                } else {
                    continue;
                }
            }
        }
        else if(ExtProductionRecords==null){
            console.log("没有要处理的ProcessProductionRecord");
        }
    } catch (err) {
        console.log("ProcessProductionRecordError", err)
    }
};

//定时运行
var rule = new schedule.RecurrenceRule();
var times = [1,30];
rule.second = times;

var c=0;
var j = schedule.scheduleJob(rule, function(){
    c++;
    console.log(c,"ProcessProductionRecord Successed");
    ProcessProductionRecord();
});



//查询出接口表ExtProductionRecord 没处理过的记录 List
function getExtProductionRecords() {
    return ExtProductionRecord.findAll({
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
    return ExtProductionRecord.update({
        isProcessed: 1
    }, {
        where: {
            id: id
        }
    })
}

//取得nextRecord List（结束时间）
function getNextRecord(stationId, bookDate) {
    return ExtProductionRecord.findAll({
        where: {
            stationId: stationId,
            bookDate: {
                gt: bookDate
            }
        }
    })
}

//将数据Insert到ProductionRecord表中
function InsertProductionRecord(stationId, startTime, endTime, cycleTime, recordDatetime, recordWeek) {
    return ProductionRecord.create({
        stationId: stationId,
        shiftId: 1,
        startTime: startTime,
        endTime: endTime,
        cycleTime: cycleTime,
        passQty: 1,
        failQty: 0,
        recordDatetime: recordDatetime,
        recordWeek: recordWeek,

    })
}

