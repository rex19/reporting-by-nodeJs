var Sequelize = require('sequelize');
var DataTypes = require('sequelize').DataTypes;
var schedule = require("node-schedule");

var ProductShiftInput = require('./models/index').ProductShiftInput;
var ProductDayOutput = require('./models/index').ProductDayOutput;
var ProductionRecord = require('./models/index').ProductionRecord;
var ExtProductionRecord = require('./models/index').ExtProductionRecord;

var DayOutput = 0;
var SumProductionTimeSpan = 0; //productionTimeSpan 总数
var ngNum = 0;
var SumbrokenDownTime = 0;
var performanceRate = 0;
var brokenDownTimeRate = 0;
var passRate = 0;
var timeRate = 0;
var oee = 0;
var createDayOutput = {};
var updateIsProcessed = {};
var dateTimeRecord = "";
var repeatDayOutputs = {};
var deleteRepeatDayOutput ={};
var BeforeDateRecordBegin = new Date();
var BeforeDateRecordEnd = new Date();



var ProcessProductionDayOutput = async function () {
    try {
        //取出所有没处理过的数据，排序
        var productShiftInputs = await getProductShiftInputs();
        //console.log("productShiftInputs",productShiftInputs);
        //取出结果中第一行的lineId,dateRecord中的年月日小时;
        if (productShiftInputs !=0) {
            var years = productShiftInputs[0].dateRecord.getFullYear();
            var months = productShiftInputs[0].dateRecord.getMonth();
            var days = productShiftInputs[0].dateRecord.getDate();
            var hours = productShiftInputs[0].dateRecord.getHours();
            var lineId = productShiftInputs[0].lineId;
            //取出ProductionRecord表中的dateRecord字段获取那天的早八点到第二天早八点的时间段
            if (hours >= 8) {
                console.log("hours >= 8__________________________________________",hours);
                BeforeDateRecordBegin = new Date(years, months, days, 8, 0, 0);
                BeforeDateRecordEnd = new Date(years, months, days + 1, 8, 0, 0);
            } else if (hours < 8) {
                console.log("hours < 8___________________________________________",hours);
                BeforeDateRecordBegin = new Date(years, months, days - 1, 8, 0, 0);
                BeforeDateRecordEnd = new Date(years, months, days, 8, 0, 0);
            }

            var DayProductShiftInputs = await getDayProductShiftInputs(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);
            var DayOutputs = await  getDayOutputs(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);

            if (DayOutputs.length > 0) {
                DayOutput = DayOutputs.length;
                SumProductionTimeSpan = 0; //productionTimeSpan 总数
                ngNum = 0;
                SumbrokenDownTime = 0;
                //当天 所有shift 投入时间相加
                DayProductShiftInputs.forEach(elemm => {
                    SumProductionTimeSpan += elemm.productionTimeSpan;
                    // console.log(SumProductionTimeSpan);
                });
                //当天 所有shift 不良品数量相加
                DayProductShiftInputs.forEach(elemm => {
                    ngNum += elemm.ngQuantity

                });
                //当天 所有shift 故障时间相加
                DayProductShiftInputs.forEach(elemm => {
                    SumbrokenDownTime += elemm.abnormalProductionTimeSpan

                });
                console.log("故障时间之和——————————",SumbrokenDownTime,"生产时间之和",SumProductionTimeSpan,"BeforeDateRecordBegin",BeforeDateRecordBegin);
                console.log("DayOutput_____________________________",DayOutput,"不良品数",ngNum, " (DayOutput - ngNum) / DayOutput=",(DayOutput - ngNum) / DayOutput);
                performanceRate = ((productShiftInputs[0].cycleTime * DayOutput) / SumProductionTimeSpan);//性能稼动率=节拍*产量/投入时间*100%
                console.log("cycletime——————————",productShiftInputs[0].cycleTime,"生产时间之和",SumProductionTimeSpan,"性能嫁动率",performanceRate);

                brokenDownTimeRate = SumbrokenDownTime / SumProductionTimeSpan;//故障率=故障时间/投入时间*100%
                passRate = (DayOutput - ngNum) / DayOutput;//良品率=（产量-不良品）/产量*100%
                timeRate = (SumProductionTimeSpan - SumbrokenDownTime) / SumProductionTimeSpan;//时间稼动率=（投入时间-异常时间）/投入时间*100%
                oee = timeRate * performanceRate * passRate; //oee = 时间嫁动率 *性能稼动率 *良品率 *100%
                dateTimeRecord = BeforeDateRecordBegin.toLocaleString();
                var repeatDayOutputs = await getRepeatDayOutputs(BeforeDateRecordBegin, lineId);
                if (repeatDayOutputs != 0) {
                    deleteRepeatDayOutput = await deleteRepeatDayOutputs(BeforeDateRecordBegin, lineId);
                    createDayOutput = await createDayOutputs(lineId, DayOutput, passRate, brokenDownTimeRate, performanceRate, timeRate, oee, dateTimeRecord);
                    updateIsProcessed = await updateProductShiftInputIsProcessed(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);
                    ProcessProductionDayOutput();
                } else if (repeatDayOutputs == 0) {
                    createDayOutput = await createDayOutputs(lineId, DayOutput, passRate, brokenDownTimeRate, performanceRate, timeRate, oee, dateTimeRecord);
                    updateIsProcessed = await updateProductShiftInputIsProcessed(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);
                    ProcessProductionDayOutput();
                }
            } else if (DayOutputs.length == 0) {
                DayOutput = 0;

                //当天 所有shift 投入时间相加
                DayProductShiftInputs.forEach(elemm => {
                    SumProductionTimeSpan += elemm.productionTimeSpan;
                    // console.log(SumProductionTimeSpan);
                });
                //当天 所有shift 不良品数量相加
                DayProductShiftInputs.forEach(elemm => {
                    ngNum += elemm.ngQuantity

                });
                //当天 所有shift 故障时间相加
                DayProductShiftInputs.forEach(elemm => {
                    SumbrokenDownTime += elemm.abnormalProductionTimeSpan

                });
                console.log("故障时间之和——————————",SumbrokenDownTime,"生产时间之和",SumProductionTimeSpan);
                console.log("DayOutput______________________________________",DayOutput,"不良品数",ngNum, " (DayOutput - ngNum) / DayOutput=",(DayOutput - ngNum) / DayOutput);
                performanceRate = ((productShiftInputs[0].cycleTime * DayOutput) / SumProductionTimeSpan);//性能稼动率=节拍*产量/投入时间*100%
                console.log("cycletime——————————",productShiftInputs[0].cycleTime,"生产时间之和",SumProductionTimeSpan,"性能嫁动率",performanceRate);
                brokenDownTimeRate = SumbrokenDownTime / SumProductionTimeSpan;//故障率=故障时间/投入时间*100%
                passRate = (DayOutput - ngNum) / DayOutput;//良品率=（产量-不良品）/产量*100%
                timeRate = (SumProductionTimeSpan - SumbrokenDownTime) / SumProductionTimeSpan;//时间稼动率=（投入时间-异常时间）/投入时间*100%
                oee = timeRate * performanceRate * passRate; //oee = 时间嫁动率 *性能稼动率 *良品率 *100%
                dateTimeRecord = BeforeDateRecordBegin.toLocaleString();

                repeatDayOutputs = await getRepeatDayOutputs(BeforeDateRecordBegin, lineId);
                if (repeatDayOutputs != 0) {
                    var deleteRepeatDayOutput = await deleteRepeatDayOutputs(BeforeDateRecordBegin, lineId);
                    createDayOutput = await createDayOutputs(lineId, DayOutput, passRate, brokenDownTimeRate, performanceRate, timeRate, oee, dateTimeRecord);
                    updateIsProcessed = await updateProductShiftInputIsProcessed(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);
                    ProcessProductionDayOutput();
                } else if (repeatDayOutputs == 0) {
                    createDayOutput = await createDayOutputs(lineId, DayOutput, passRate, brokenDownTimeRate, performanceRate, timeRate, oee, dateTimeRecord);
                    updateIsProcessed = await updateProductShiftInputIsProcessed(BeforeDateRecordEnd, BeforeDateRecordBegin, lineId);
                    ProcessProductionDayOutput();
                }
            }
        }else if(productShiftInputs.length ==0){
            console.log("无数据需要处理")
        }
    }catch (err){
        console.log("ProcessProductionDayOutputError：",err)
    }
}

//定时运行
var rule = new schedule.RecurrenceRule();
rule.second = [0, 30];
/*rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 8;
rule.minute = 0;*/
var c=0;
var j = schedule.scheduleJob(rule, function(){
    c++;
    console.log(c,"ProcessProductionDayOutput Successed"+new Date());
    ProcessProductionDayOutput();
});



//查询出接口表ProductionShiftInput 没处理过的记录 List
function getProductShiftInputs() {
    return ProductShiftInput.findAll({
        where: {
            isProcessed: false,
            deleted:0
        },
        order: [
            ['dateRecord', 'ASC']
        ]
    })
}



/**
 * 取出ShiftInput表中lineId = 上面结果集的lineId,isProcessed=false;
 * dateRecord=小于第二天8点，大于等于当天8点；的条件取出当天所有当班数据；
 */
function getDayProductShiftInputs(BeforeDateRecordEnd,BeforeDateRecordBegin,lineId) {
    return ProductShiftInput.findAll({
        where: {
            isProcessed: false,
            deleted:0,
            dateRecord: {
                $lt: BeforeDateRecordEnd,
                $gte: BeforeDateRecordBegin
            },
            "lineId": lineId
        }
    })
}


//取根据上面的时间段的产量
function getDayOutputs(BeforeDateRecordEnd,BeforeDateRecordBegin,lineId) {
    return ExtProductionRecord.findAll({
        where: {
            "stationId": lineId + 16,
            bookDate: {
                $lt: BeforeDateRecordEnd,
                $gte: BeforeDateRecordBegin
            }
        }
    })
}

//查找是否有重复的
function getRepeatDayOutputs(BeforeDateRecordBegin,lineId) {
    return ProductDayOutput.findAll({
        where: {
            dateTimeRecord: BeforeDateRecordBegin.toLocaleString(),
            lineId: lineId
        }
    })
}

//删除重复
function deleteRepeatDayOutputs(BeforeDateRecordBegin,lineId) {
    return ProductDayOutput.destroy({
        where: {
            dateTimeRecord: BeforeDateRecordBegin.toLocaleString(),
            lineId: lineId
        }
    })
}

//创建一条记录
function createDayOutputs(lineId,DayOutput,passRate,brokenDownTimeRate,performanceRate,timeRate,oee,dateTimeRecord){
    return ProductDayOutput.create({
        "lineId": lineId,
        "output": DayOutput,
        "passRate": passRate,
        "brokenDownTimeRate": brokenDownTimeRate,
        "performanceRate": performanceRate,
        "timeRate": timeRate,
        "oee": oee,
        // "dateTimeRecord":"2016-11-06 08:00:00"
        "dateTimeRecord":dateTimeRecord,
        "isProcessed":0,
        "deleted":0
    })
}

//update 当天8点到第二天8点的的当班记录  isProcessed为true
function updateProductShiftInputIsProcessed(BeforeDateRecordEnd,BeforeDateRecordBegin,lineId){
    return ProductShiftInput.update({
        "isProcessed": true
    }, {
        where: {
            dateRecord: {
                $lt: BeforeDateRecordEnd,
                $gte: BeforeDateRecordBegin
            },
            lineId: lineId
        }
    })
}



