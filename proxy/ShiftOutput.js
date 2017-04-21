/**
 * Created by rex.ni on 2016/11/12.
 */
const ProductionRecord = require('../models').ProductionRecord;
const ExtProductionRecord = require('../models').ExtProductionRecord;

//获取A排班方式产量
exports.getShiftAOutput = function (cb) {
    //console.log('ok');

    var arrShiftA = [];

    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var hour = new Date().getHours();
    /**
     *因时区问题 下面算时间全部+8小时
     * @type {Date}
     */
        //取当天的早八点做开始时间  早班开始   如果当前时间没过0点
    var ShiftA1Begin1 = new Date(year, month, day, 8, 0, 0);
    //取前一天的早八点做开始时间 早班   如果过了0点就-1
    var ShiftA1Begin2 = new Date(year, month, day - 1, 8, 0, 0);
    //取当天的16点做结束时间 早班结束
    var ShiftA1End1 = new Date(year, month, day , 16, 0, 0);
    //取前一天的16点做结束时间 早班结束
    var ShiftA1End2 = new Date(year, month, day-1, 16, 0, 0);
    //中班
    var ShiftA2Begin1 = new Date(year, month, day , 16, 0, 0);
    var ShiftA2Begin2 = new Date(year, month, day-1, 16, 0, 0);
    var ShiftA2End1 = new Date(year, month, day + 1, 0, 0, 0);
    var ShiftA2End2 = new Date(year, month, day, 0, 0, 0);
    //晚班
    var ShiftA3Begin1 = new Date(year, month, day + 1, 0, 0, 0);
    var ShiftA3Begin2 = new Date(year, month, day, 0, 0, 0);
    var ShiftA3End1 = new Date(year, month, day + 1, 8, 0, 0);
    var ShiftA3End2 = new Date(year, month, day, 8, 0, 0);


/*    var ShiftA1Begin1 = new Date(year, month, day, 16, 0, 0);
    //取前一天的早八点做开始时间 早班   如果过了0点就-1
    var ShiftA1Begin2 = new Date(year, month, day - 1, 16, 0, 0);
    //取当天的16点做结束时间 早班结束
    var ShiftA1End1 = new Date(year, month, day + 1, 0, 0, 0);
    //取前一天的16点做结束时间 早班结束
    var ShiftA1End2 = new Date(year, month, day, 0, 0, 0);
    //中班
    var ShiftA2Begin1 = new Date(year, month, day + 1, 0, 0, 0);
    var ShiftA2Begin2 = new Date(year, month, day, 0, 0, 0);
    var ShiftA2End1 = new Date(year, month, day + 1, 8, 0, 0);
    var ShiftA2End2 = new Date(year, month, day, 8, 0, 0);
    //晚班
    var ShiftA3Begin1 = new Date(year, month, day + 1, 8, 0, 0);
    var ShiftA3Begin2 = new Date(year, month, day, 8, 0, 0);
    var ShiftA3End1 = new Date(year, month, day + 1, 16, 0, 0);
    var ShiftA3End2 = new Date(year, month, day, 16, 0, 0);*/


    arrShiftA.push({
        //早班
        "Line1A1": 0,
        "Line2A1": 0,
        "Line3A1": 0,
        "Line4A1": 0,
        //中班
        "Line1A2": 0,
        "Line2A2": 0,
        "Line3A2": 0,
        "Line4A2": 0,
        //晚班
        "Line1A3": 0,
        "Line2A3": 0,
        "Line3A3": 0,
        "Line4A3": 0,
    });

    //console.log("arrShiftA", arrShiftA);
    //console.log(ShiftA1Begin1);
    //console.log(ShiftA1End1);
    if (hour >= 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftA1End1,
                    gte: ShiftA1Begin1
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftA1End1,
                        gte: ShiftA1Begin1
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftA1End1,
                            gte: ShiftA1Begin1
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftA1End1,
                                gte: ShiftA1Begin1
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftA2End1,
                                    gte: ShiftA2Begin1
                                },
                                stationId: 17
                            }
                        }).then(function (result5) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftA2End1,
                                        gte: ShiftA2Begin1
                                    },
                                    stationId: 18
                                }
                            }).then(function (result6) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftA2End1,
                                            gte: ShiftA2Begin1
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result7) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftA2End1,
                                                gte: ShiftA2Begin1
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result8) {
                                        ExtProductionRecord.findAll({
                                            where: {
                                                bookDate: {
                                                    lt: ShiftA3End1,
                                                    gte: ShiftA3Begin1
                                                },
                                                stationId: 17
                                            }
                                        }).then(function (result9) {
                                            ExtProductionRecord.findAll({
                                                where: {
                                                    bookDate: {
                                                        lt: ShiftA3End1,
                                                        gte: ShiftA3Begin1
                                                    },
                                                    stationId: 18
                                                }
                                            }).then(function (result10) {
                                                ExtProductionRecord.findAll({
                                                    where: {
                                                        bookDate: {
                                                            lt: ShiftA3End1,
                                                            gte: ShiftA3Begin1
                                                        },
                                                        stationId: 19
                                                    }
                                                }).then(function (result11) {
                                                    ExtProductionRecord.findAll({
                                                        where: {
                                                            bookDate: {
                                                                lt: ShiftA3End1,
                                                                gte: ShiftA3Begin1
                                                            },
                                                            stationId: 20
                                                        }
                                                    }).then(function (result12) {

                                                        // console.log("result1", result1.length);
                                                        arrShiftA[0].Line1A1 = result1.length;
                                                        arrShiftA[0].Line2A1 = result2.length;
                                                        arrShiftA[0].Line3A1 = result3.length;
                                                        arrShiftA[0].Line4A1 = result4.length;
                                                        arrShiftA[0].Line1A2 = result5.length;
                                                        arrShiftA[0].Line2A2 = result6.length;
                                                        arrShiftA[0].Line3A2 = result7.length;
                                                        arrShiftA[0].Line4A2 = result8.length;
                                                        arrShiftA[0].Line1A3 = result9.length;
                                                        arrShiftA[0].Line2A3 = result10.length;
                                                        arrShiftA[0].Line3A3 = result11.length;
                                                        arrShiftA[0].Line4A3 = result12.length;
                                                        // console.log("arrShiftA[0].Line1A1", arrShiftA[0].Line1A1);
                                                        // console.log("arrShiftA[0].Line2A1", arrShiftA[0].Line2A1);
                                                        // console.log("arrShiftA[0].Line3A1", arrShiftA[0].Line3A1);
                                                        // console.log("arrShiftA[0].Line4A1", arrShiftA[0].Line4A1);
                                                        // console.log("arrShiftA[0]", arrShiftA[0]);
                                                        return cb(null, arrShiftA);
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })

        }).catch(function (err) {
            return cb(err, null)
        });
    } else if (hour < 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftA1End2,
                    gte: ShiftA1Begin2
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftA1End2,
                        gte: ShiftA1Begin2
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftA1End2,
                            gte: ShiftA1Begin2
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftA1End2,
                                gte: ShiftA1Begin2
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftA2End2,
                                    gte: ShiftA2Begin2
                                },
                                stationId: 17
                            }
                        }).then(function (result5) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftA2End2,
                                        gte: ShiftA2Begin2
                                    },
                                    stationId: 18
                                }
                            }).then(function (result6) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftA2End2,
                                            gte: ShiftA2Begin2
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result7) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftA2End2,
                                                gte: ShiftA2Begin2
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result8) {
                                        ExtProductionRecord.findAll({
                                            where: {
                                                bookDate: {
                                                    lt: ShiftA3End2,
                                                    gte: ShiftA3Begin2
                                                },
                                                stationId: 17
                                            }
                                        }).then(function (result9) {
                                            ExtProductionRecord.findAll({
                                                where: {
                                                    bookDate: {
                                                        lt: ShiftA3End2,
                                                        gte: ShiftA3Begin2
                                                    },
                                                    stationId: 18
                                                }
                                            }).then(function (result10) {
                                                ExtProductionRecord.findAll({
                                                    where: {
                                                        bookDate: {
                                                            lt: ShiftA3End2,
                                                            gte: ShiftA3Begin2
                                                        },
                                                        stationId: 19
                                                    }
                                                }).then(function (result11) {
                                                    ExtProductionRecord.findAll({
                                                        where: {
                                                            bookDate: {
                                                                lt: ShiftA3End2,
                                                                gte: ShiftA3Begin2
                                                            },
                                                            stationId: 20
                                                        }
                                                    }).then(function (result12) {

                                                        // console.log("result1", result1.length);
                                                        arrShiftA[0].Line1A1 = result1.length;
                                                        arrShiftA[0].Line2A1 = result2.length;
                                                        arrShiftA[0].Line3A1 = result3.length;
                                                        arrShiftA[0].Line4A1 = result4.length;
                                                        arrShiftA[0].Line1A2 = result5.length;
                                                        arrShiftA[0].Line2A2 = result6.length;
                                                        arrShiftA[0].Line3A2 = result7.length;
                                                        arrShiftA[0].Line4A2 = result8.length;
                                                        arrShiftA[0].Line1A3 = result9.length;
                                                        arrShiftA[0].Line2A3 = result10.length;
                                                        arrShiftA[0].Line3A3 = result11.length;
                                                        arrShiftA[0].Line4A3 = result12.length;
                                                        // console.log("arrShiftA[0].Line1A1", arrShiftA[0].Line1A1);
                                                        // console.log("arrShiftA[0].Line2A1", arrShiftA[0].Line2A1);
                                                        // console.log("arrShiftA[0].Line3A1", arrShiftA[0].Line3A1);
                                                        // console.log("arrShiftA[0].Line4A1", arrShiftA[0].Line4A1);
                                                        // console.log("arrShiftA[0]", arrShiftA[0]);
                                                        return cb(null, arrShiftA);
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })

        }).catch(function (err) {
            return cb(err, null)
        });
    }
};


//获取B排班方式产量
exports.getShiftBOutput = function (cb) {
    //console.log('ok');

    var arrShiftB = [];

    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var hour = new Date().getHours();
    /**
     *因时区问题 下面算时间全部+8小时
     * @type {Date}
     */
        //取当天的早八点做开始时间  早班开始   如果当前时间没过0点
    var ShiftB1Begin1 = new Date(year, month, day, 8, 0, 0);
    //取前一天的早八点做开始时间 早班   如果过了0点就-1
    var ShiftB1Begin2 = new Date(year, month, day - 1, 8, 0, 0);
    //取当天的16点做结束时间 早班结束
    var ShiftB1End1 = new Date(year, month, day , 20, 0, 0);
    //取前一天的16点做结束时间 早班结束
    var ShiftB1End2 = new Date(year, month, day-1, 20, 0, 0);

    //晚班
    var ShiftB3Begin1 = new Date(year, month, day , 20, 0, 0);
    var ShiftB3Begin2 = new Date(year, month, day-1, 20, 0, 0);
    var ShiftB3End1 = new Date(year, month, day+1 , 8, 0, 0);
    var ShiftB3End2 = new Date(year, month, day, 8, 0, 0);


    arrShiftB.push({
        //早班
        "Line1B1": 0,
        "Line2B1": 0,
        "Line3B1": 0,
        "Line4B1": 0,
        //晚班
        "Line1B3": 0,
        "Line2B3": 0,
        "Line3B3": 0,
        "Line4B3": 0,
    });

    //console.log("arrShiftA", arrShiftA);
    //console.log(ShiftA1Begin1);
    //console.log(ShiftA1End1);
    if (hour >= 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftB1End1,
                    gte: ShiftB1Begin1
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftB1End1,
                        gte: ShiftB1Begin1
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftB1End1,
                            gte: ShiftB1Begin1
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftB1End1,
                                gte: ShiftB1Begin1
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftB3End1,
                                    gte: ShiftB3Begin1
                                },
                                stationId: 17
                            }
                        }).then(function (result9) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftB3End1,
                                        gte: ShiftB3Begin1
                                    },
                                    stationId: 18
                                }
                            }).then(function (result10) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftB3End1,
                                            gte: ShiftB3Begin1
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result11) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftB3End1,
                                                gte: ShiftB3Begin1
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result12) {

                                        // console.log("result1", result1.length);
                                        arrShiftB[0].Line1B1 = result1.length;
                                        arrShiftB[0].Line2B1 = result2.length;
                                        arrShiftB[0].Line3B1 = result3.length;
                                        arrShiftB[0].Line4B1 = result4.length;

                                        arrShiftB[0].Line1B3 = result9.length;
                                        arrShiftB[0].Line2B3 = result10.length;
                                        arrShiftB[0].Line3B3 = result11.length;
                                        arrShiftB[0].Line4B3 = result12.length;

                                        return cb(null, arrShiftB);
                                    })
                                })
                            })
                        })
                    })
                })
            })


        }).catch(function (err) {
            return cb(err, null)
        });
    } else if (hour < 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftB1End2,
                    gte: ShiftB1Begin2
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftB1End2,
                        gte: ShiftB1Begin2
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftB1End2,
                            gte: ShiftB1Begin2
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftB1End2,
                                gte: ShiftB1Begin2
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftB3End2,
                                    gte: ShiftB3Begin2
                                },
                                stationId: 17
                            }
                        }).then(function (result9) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftB3End2,
                                        gte: ShiftB3Begin2
                                    },
                                    stationId: 18
                                }
                            }).then(function (result10) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftB3End2,
                                            gte: ShiftB3Begin2
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result11) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftB3End2,
                                                gte: ShiftB3Begin2
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result12) {

                                        // console.log("result1", result1.length);
                                        arrShiftB[0].Line1B1 = result1.length;
                                        arrShiftB[0].Line2B1 = result2.length;
                                        arrShiftB[0].Line3B1 = result3.length;
                                        arrShiftB[0].Line4B1 = result4.length;

                                        arrShiftB[0].Line1B3 = result9.length;
                                        arrShiftB[0].Line2B3 = result10.length;
                                        arrShiftB[0].Line3B3 = result11.length;
                                        arrShiftB[0].Line4B3 = result12.length;

                                        return cb(null, arrShiftB);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch(function (err) {
            return cb(err, null)
        });
    }
};





//获取C排班方式产量
exports.getShiftCOutput = function (cb) {
    //console.log('ok');

    var arrShiftC = [];

    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var hour = new Date().getHours();
    /**
     *因时区问题 下面算时间全部+8小时
     * @type {Date}
     */
        //取当天的早八点做开始时间  早班开始   如果当前时间没过0点
    var ShiftC1Begin1 = new Date(year, month, day, 8, 0, 0);
    //取前一天的早八点做开始时间 早班   如果过了0点就-1
    var ShiftC1Begin2 = new Date(year, month, day -1, 8, 0, 0);
    //取当天的16点做结束时间 早班结束
    var ShiftC1End1 = new Date(year, month, day , 18, 0, 0);
    //取前一天的16点做结束时间 早班结束
    var ShiftC1End2 = new Date(year, month, day -1, 18, 0, 0);

    //晚班
    var ShiftC3Begin1 = new Date(year, month, day,18, 0, 0);
    var ShiftC3Begin2 = new Date(year, month, day -1, 18, 0, 0);
    var ShiftC3End1 = new Date(year, month, day + 1, 8, 0, 0);
    var ShiftC3End2 = new Date(year, month, day, 8, 0, 0);


    arrShiftC.push({
        //早班
        "Line1C1": 0,
        "Line2C1": 0,
        "Line3C1": 0,
        "Line4C1": 0,
        //晚班
        "Line1C3": 0,
        "Line2C3": 0,
        "Line3C3": 0,
        "Line4C3": 0,
    });

    if (hour >= 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftC1End1,
                    gte: ShiftC1Begin1
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftC1End1,
                        gte: ShiftC1Begin1
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftC1End1,
                            gte: ShiftC1Begin1
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftC1End1,
                                gte: ShiftC1Begin1
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftC3End1,
                                    gte: ShiftC3Begin1
                                },
                                stationId: 17
                            }
                        }).then(function (result9) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftC3End1,
                                        gte: ShiftC3Begin1
                                    },
                                    stationId: 18
                                }
                            }).then(function (result10) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftC3End1,
                                            gte: ShiftC3Begin1
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result11) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftC3End1,
                                                gte: ShiftC3Begin1
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result12) {

                                        // console.log("result1", result1.length);
                                        arrShiftC[0].Line1C1 = result1.length;
                                        arrShiftC[0].Line2C1 = result2.length;
                                        arrShiftC[0].Line3C1 = result3.length;
                                        arrShiftC[0].Line4C1 = result4.length;

                                        arrShiftC[0].Line1C3 = result9.length;
                                        arrShiftC[0].Line2C3 = result10.length;
                                        arrShiftC[0].Line3C3 = result11.length;
                                        arrShiftC[0].Line4C3 = result12.length;
                                        // console.log("arrShiftC",arrShiftC);
                                        return cb(null, arrShiftC);

                                    })
                                })
                            })
                        })
                    })
                })
            })


        }).catch(function (err) {
            return cb(err, null)
        });
    } else if (hour < 8) {
        ExtProductionRecord.findAll({
            where: {
                bookDate: {
                    lt: ShiftC1End2,
                    gte: ShiftC1Begin2
                },
                stationId: 17
            }
        }).then(function (result1) {
            ExtProductionRecord.findAll({
                where: {
                    bookDate: {
                        lt: ShiftC1End2,
                        gte: ShiftC1Begin2
                    },
                    stationId: 18
                }
            }).then(function (result2) {
                ExtProductionRecord.findAll({
                    where: {
                        bookDate: {
                            lt: ShiftC1End2,
                            gte: ShiftC1Begin2
                        },
                        stationId: 19
                    }
                }).then(function (result3) {
                    ExtProductionRecord.findAll({
                        where: {
                            bookDate: {
                                lt: ShiftC1End2,
                                gte: ShiftC1Begin2
                            },
                            stationId: 20
                        }
                    }).then(function (result4) {

                        ExtProductionRecord.findAll({
                            where: {
                                bookDate: {
                                    lt: ShiftC3End2,
                                    gte: ShiftC3Begin2
                                },
                                stationId: 17
                            }
                        }).then(function (result9) {
                            ExtProductionRecord.findAll({
                                where: {
                                    bookDate: {
                                        lt: ShiftC3End2,
                                        gte: ShiftC3Begin2
                                    },
                                    stationId: 18
                                }
                            }).then(function (result10) {
                                ExtProductionRecord.findAll({
                                    where: {
                                        bookDate: {
                                            lt: ShiftC3End2,
                                            gte: ShiftC3Begin2
                                        },
                                        stationId: 19
                                    }
                                }).then(function (result11) {
                                    ExtProductionRecord.findAll({
                                        where: {
                                            bookDate: {
                                                lt: ShiftC3End2,
                                                gte: ShiftC3Begin2
                                            },
                                            stationId: 20
                                        }
                                    }).then(function (result12) {

                                        // console.log("result1", result1.length);
                                        arrShiftC[0].Line1C1 = result1.length;
                                        arrShiftC[0].Line2C1 = result2.length;
                                        arrShiftC[0].Line3C1 = result3.length;
                                        arrShiftC[0].Line4C1 = result4.length;

                                        arrShiftC[0].Line1C3 = result9.length;
                                        arrShiftC[0].Line2C3 = result10.length;
                                        arrShiftC[0].Line3C3 = result11.length;
                                        arrShiftC[0].Line4C3 = result12.length;

                                        return cb(null, arrShiftC);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }).catch(function (err) {
            return cb(err, null)
        });
    }
}

