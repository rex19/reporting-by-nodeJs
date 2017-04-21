const User = require('../models').User;
const Role = require('../models').Role;
const UserCheckIn = require('../models').UserCheckIn;


//  查询所有所有
exports.getAllUser = function(cb) {
    // User.findAll({
    //   attributes: ['foo', 'bar']
    // }).then(cb).catch(cb);

    // cb = function(err,data){
    //   if(err) logger.error(err);
    //   res.send(data);
    // }

    User.findAll({}).then(function(result) {
        return cb(null, result)
    }).catch(function(err) {
        return cb(err, null)
    })
}

exports.addUserAndRole = function(obj,cb) {
    // body...
    Promise.all([
        User.create({
            username: obj.username,
            password: obj.pwd
        })
    ]).then(function(result) {
        return cb(null, result)
    }).catch(function(err) {
        return cb(err, null)
    })
};


exports.addUserAndUserCheckIn = function(cb) {
    // body...
    User.create({username:'itbilu', password:'itbilu.com'}).then(function(user) {
        var userCheckin = UserCheckIn.build({loginIp:'127.0.0.1'});
        user.setUserCheckIn(userCheckin);
        return cb(null, "OK")
    }).catch(function(err) {
        return cb(err, null)
    })
};


//根据id删除
exports.deleteUser = function(obj,cb){
    User.destroy({'where':{id:obj.id}}).then(function(){
        return cb(null, "OK")
    }).catch(function(err) {
        return cb(err, null)
    })
}

