/**
 * Created by rex.ni on 2016/12/28.
 */
var Sequelize = require('sequelize');
var DataTypes = require('sequelize').DataTypes;
var schedule = require("node-schedule");

var ExtStationStatusRecord = require('./models/index').ExtStationStatusRecord;
var ExtProductionRecord = require('./models/index').ExtProductionRecord;


var OldExtProduction = {};
var NewExtProduction = {};
var OldRecord = {};
var NewRecord = {};
var num = 0;
var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDate();
var hour = new Date().getHours();
var Begin1 = new Date(year, month, day, 8, 0, 0);
var End1 = new Date(year, month, day + 1, 8, 0, 0);
var Begin2 = new Date(year, month, day - 1, 8, 0, 0);
var End2 = new Date(year, month, day, 8, 0, 0);
var station1Record = {};
var station2Record = {};
var station3Record = {};
var station4Record = {};
var station17Record = {};

var WaitStatusRecord = async function (station1,station2,station3,station4,i) {
    try {
        if (hour >= 8) {
            console.log("hours >= 8__________________________________________")
            if (num >= 4) {
                num == 0;
            }

            if (num == 0) {
                console.log("num==0");
                OldExtProduction = await getExtProductionRecords(End1, Begin1, i);
                if (OldExtProduction != null) {
                    OldRecord = OldExtProduction.length;
                    // OldStatusId = OldExtStaionStatus[0].statusId;
                    console.log("OldRecord", OldRecord);
                } else {
                    console.log("OldExtProduction无记录")
                }
            }

            num++;
            var now = new Date().toLocaleString();
            if (num == 2) {
                console.log("num==2");
                NewExtProduction = await getExtProductionRecords(End1, Begin1, i);
                if (NewExtProduction != null) {
                    station1Record = await getExtStationStatusRecords(station1);
                    station2Record = await getExtStationStatusRecords(station2);
                    station3Record = await getExtStationStatusRecords(station3);
                    station4Record = await getExtStationStatusRecords(station4);
                    station17Record = await getExtStationStatusRecords(i);
                    NewRecord = NewExtProduction.length;
                    // NewStatusId = NewExtStaionStatus[0].statusId;
                    console.log("NewRecord", NewRecord);

                    //检查如果有料生产但是为等待状态 则变更为正常绿灯
                    if (OldRecord != NewRecord) {
                        console.log("正常生产中,num=", num);
                        console.log("NewRecord", NewRecord);
                        console.log("OldRecord", OldRecord);
                        if (station1Record != null) {
                            if (station1Record.statusId == 2) {
                                await InsertRunStatus(station1, now);
                            }
                        }
                        if (station2Record != null) {
                            if (station2Record.statusId == 2) {
                                await InsertRunStatus(station2, now);
                            }
                        }
                        if (station3Record != null) {
                            if (station3Record.statusId == 2) {
                                await InsertRunStatus(station3, now);
                            }
                        }
                        if (station4Record != null) {
                            if (station4Record.statusId == 2) {
                                await InsertRunStatus(station4, now);
                            }
                        }
                        if (station17Record != null) {
                            if (station17Record.statusId == 2) {
                                await InsertRunStatus(i, now);
                            }
                        }
                    } else if (OldRecord == NewRecord) {
                        console.log("不在生产中")
                    }
                }

            }

            if (num == 3) {
                console.log("num==3");
                NewExtProduction = await getExtProductionRecords(End1, Begin1, i);

                // NewExtStaionStatus = await getExtStationStatusRecords();
                if (NewExtProduction != null) {
                    station1Record = await getExtStationStatusRecords(station1);
                    station2Record = await getExtStationStatusRecords(station2);
                    station3Record = await getExtStationStatusRecords(station3);
                    station4Record = await getExtStationStatusRecords(station4);
                    station17Record = await getExtStationStatusRecords(i);
                    NewRecord = NewExtProduction.length;
                    // NewStatusId = NewExtStaionStatus[0].statusId;
                    console.log("NewRecord", NewRecord);

                    //检查如果有料生产但是为等待状态 则变更为正常绿灯
                    if (OldRecord != NewRecord) {
                        console.log("正常生产中,num=", num);

                        if (station1Record != null) {
                            console.log("station1Record != null");
                            if (station1Record.statusId == 2) {
                                console.log("station1Record.statusId == 2");
                                await InsertRunStatus(station1, now);
                            }
                        }
                        if (station2Record != null) {
                            if (station2Record.statusId == 2) {
                                await InsertRunStatus(station2, now);
                            }
                        }
                        if (station3Record != null) {
                            if (station3Record.statusId == 2) {
                                await InsertRunStatus(station3, now);
                            }
                        }
                        if (station4Record != null) {
                            if (station4Record.statusId == 2) {
                                await InsertRunStatus(station4, now);
                            }
                        }
                        if (station17Record != null) {
                            if (station17Record.statusId == 2) {
                                await InsertRunStatus(i, now);
                            }
                        }
                        num = 0;
                    } else if (OldRecord == NewRecord) {
                        console.log("不在生产中");

                        if (station1Record != null) {
                            if (station1Record.statusId == 0) {
                                console.log("station1Record.statusId", station1Record.statusId);
                                await InsertWaitStatus(station1, now);
                            }
                        } else {
                            console.log("station1Record==null");
                            await InsertWaitStatus(station1, now);
                        }

                        if (station2Record != null) {
                            if (station2Record.statusId == 0) {
                                await InsertWaitStatus(station2, now);
                            }
                        } else {
                            await InsertWaitStatus(station2, now);
                        }

                        if (station3Record != null) {
                            if (station3Record.statusId == 0) {
                                await InsertWaitStatus(station3, now);
                            }
                        } else {
                            await InsertWaitStatus(station3, now);
                        }

                        if (station4Record != null) {
                            if (station4Record.statusId == 0) {
                                await InsertWaitStatus(station4, now);
                            }
                        } else {
                            await InsertWaitStatus(station4, now);
                        }

                        if (station17Record != null) {
                            if (station17Record.statusId == 0) {
                                await InsertWaitStatus(i, now);
                            }
                        } else {
                            await InsertWaitStatus(i, now);
                        }

                    }
                } else {
                    console.log("NewExtProduction无记录");
                    // var Insert3 = await InsertWaitStatus();
                }
                num = 0;
                // WaitStatusRecord(17);
            }
            console.log("num", num);
            // }
        } else if (hour < 8) {
            console.log("hours < 8__________________________________________")
            if (num >= 4) {
                num == 0;
            }

            if (num == 0) {
                console.log("num==0");
                OldExtProduction = await getExtProductionRecords(End2, Begin2, i);
                if (OldExtProduction != null) {
                    OldRecord = OldExtProduction.length;
                    // OldStatusId = OldExtStaionStatus[0].statusId;
                    console.log("OldRecord", OldRecord);
                } else {
                    console.log("OldExtProduction无记录")
                }
            }

            num++;
            var now = new Date().toLocaleString();
            if (num == 2) {
                console.log("num==2");
                NewExtProduction = await getExtProductionRecords(End2, Begin2, i);
                if (NewExtProduction != null) {
                    station1Record = await getExtStationStatusRecords(station1);
                    station2Record = await getExtStationStatusRecords(station2);
                    station3Record = await getExtStationStatusRecords(station3);
                    station4Record = await getExtStationStatusRecords(station4);
                    station17Record = await getExtStationStatusRecords(i);
                    NewRecord = NewExtProduction.length;
                    // NewStatusId = NewExtStaionStatus[0].statusId;
                    console.log("NewRecord", NewRecord);

                    //检查如果有料生产但是为等待状态 则变更为正常绿灯
                    if (OldRecord != NewRecord) {
                        console.log("正常生产中,num=", num);
                        console.log("NewRecord", NewRecord);
                        console.log("OldRecord", OldRecord);
                        if (station1Record != null) {
                            if (station1Record.statusId == 2) {
                                await InsertRunStatus(station1, now);
                            }
                        }
                        if (station2Record != null) {
                            if (station2Record.statusId == 2) {
                                await InsertRunStatus(station2, now);
                            }
                        }
                        if (station3Record != null) {
                            if (station3Record.statusId == 2) {
                                await InsertRunStatus(station3, now);
                            }
                        }
                        if (station4Record != null) {
                            if (station4Record.statusId == 2) {
                                await InsertRunStatus(station4, now);
                            }
                        }
                        if (station17Record != null) {
                            if (station17Record.statusId == 2) {
                                await InsertRunStatus(i, now);
                            }
                        }
                    } else if (OldRecord == NewRecord) {
                        console.log("不在生产中")
                    }
                }

            }

            if (num == 3) {
                console.log("num==3");
                NewExtProduction = await getExtProductionRecords(End2, Begin2, i);

                // NewExtStaionStatus = await getExtStationStatusRecords();
                if (NewExtProduction != null) {
                    station1Record = await getExtStationStatusRecords(station1);
                    station2Record = await getExtStationStatusRecords(station2);
                    station3Record = await getExtStationStatusRecords(station3);
                    station4Record = await getExtStationStatusRecords(station4);
                    station17Record = await getExtStationStatusRecords(i);
                    NewRecord = NewExtProduction.length;
                    // NewStatusId = NewExtStaionStatus[0].statusId;
                    console.log("NewRecord", NewRecord);

                    //检查如果有料生产但是为等待状态 则变更为正常绿灯
                    if (OldRecord != NewRecord) {
                        console.log("正常生产中,num=", num);
                        /*        console.log("NewRecord", NewRecord);
                         console.log("OldRecord", OldRecord);
                         console.log("station1Record", station1Record);
                         console.log("station2Record", station2Record);
                         console.log("station3Record", station3Record);
                         console.log("station4Record", station4Record);
                         console.log("station17Record", station17Record);*/

                        if (station1Record != null) {
                            console.log("station1Record != null");
                            if (station1Record.statusId == 2) {
                                console.log("station1Record.statusId == 2");
                                await InsertRunStatus(station1, now);
                            }
                        }
                        if (station2Record != null) {
                            if (station2Record.statusId == 2) {
                                await InsertRunStatus(station2, now);
                            }
                        }
                        if (station3Record != null) {
                            if (station3Record.statusId == 2) {
                                await InsertRunStatus(station3, now);
                            }
                        }
                        if (station4Record != null) {
                            if (station4Record.statusId == 2) {
                                await InsertRunStatus(station4, now);
                            }
                        }
                        if (station17Record != null) {
                            if (station17Record.statusId == 2) {
                                await InsertRunStatus(i, now);
                            }
                        }
                        num = 0;
                    } else if (OldRecord == NewRecord) {
                        console.log("不在生产中");

                        if (station1Record != null) {
                            console.log("station1Record!=null", station1Record);
                            if (station1Record.statusId == 0) {
                                console.log("station1Record.statusId", station1Record.statusId);
                                await InsertWaitStatus(station1, now);
                            }
                        } else {
                            console.log("station1Record==null");
                            await InsertWaitStatus(station1, now);
                        }

                        if (station2Record != null) {
                            if (station2Record.statusId == 0) {
                                await InsertWaitStatus(station2, now);
                            }
                        } else {
                            await InsertWaitStatus(station2, now);
                        }

                        if (station3Record != null) {
                            if (station3Record.statusId == 0) {
                                await InsertWaitStatus(station3, now);
                            }
                        } else {
                            await InsertWaitStatus(station3, now);
                        }

                        if (station4Record != null) {
                            if (station4Record.statusId == 0) {
                                await InsertWaitStatus(station4, now);
                            }
                        } else {
                            await InsertWaitStatus(station4, now);
                        }

                        if (station17Record != null) {
                            if (station17Record.statusId == 0) {
                                await InsertWaitStatus(i, now);
                            }
                        } else {
                            await InsertWaitStatus(i, now);
                        }

                    }
                } else {
                    console.log("NewExtProduction无记录");
                    // var Insert3 = await InsertWaitStatus();
                }
                num = 0;
                // WaitStatusRecord(17);
            }
            console.log("num", num);
            // }
        }
    } catch (err) {
        console.log("WaitStatusRecord17Error:", err)
    }
}

//定时运行
var rule17 = new schedule.RecurrenceRule();
var times17 = [5, 35];
rule17.second = times17;
/*var rule18 = new schedule.RecurrenceRule();
var times18 = [15, 45];
rule18.second = times18;
var rule19 = new schedule.RecurrenceRule();
var times19 = [25, 55];
rule17.second = times19;
var rule20 = new schedule.RecurrenceRule();
var times20 = [35, 5];
rule18.second = times20;*/

var a = 0;
var j = schedule.scheduleJob(rule17, function () {
    a++;
    console.log(a, "WaitStatusRecord17 Successed");
    WaitStatusRecord(1,2,3,4,17);
});
/*
var b = 0;
var k = schedule.scheduleJob(rule18, function () {
    b++;
    console.log(b, "WaitStatusRecord18 Successed");
    WaitStatusRecord(5,6,7,8,18);
});
var c = 0;
var l = schedule.scheduleJob(rule19, function () {
    c++;
    console.log(c, "WaitStatusRecord19 Successed");
    WaitStatusRecord(9,10,11,12,19);
});
var d = 0;
var m = schedule.scheduleJob(rule20, function () {
    d++;
    console.log(d, "WaitStatusRecord20 Successed");
    WaitStatusRecord(13,14,15,16,20);
});
*/


// WaitStatusRecord();
//查询出接口表ExtProductionRecord 没处理过的记录 List
function getExtProductionRecords(End, Begin, stationId) {
    return ExtProductionRecord.findAll({
        where: {
            stationId: stationId,
            bookDate: {
                lt: End,
                gte: Begin
            }
        },
        order: [
            ['bookDate', 'DESC']
        ]
    })
}

//查询出接口表ExtStationStatusRecord 没处理过的记录 List
function getExtStationStatusRecords(stationId) {
    return ExtStationStatusRecord.findOne({
        where: {
            stationId: stationId
        },
        order: [
            ['bookDate', 'DESC']
        ]
    })
}


//将数据Insert到ExtStationStatusRecord表中
function InsertWaitStatus(stationId, now) {
    return ExtStationStatusRecord.create({
        stationId: stationId,
        statusId: 2,
        bookDate: now,
        isProcessed: 0,
    })
}

//将数据Insert到ExtStationStatusRecord表中
function InsertRunStatus(stationId, now) {
    return ExtStationStatusRecord.create({
        stationId: stationId,
        statusId: 0,
        bookDate: now,
        isProcessed: 0,
    })
}
