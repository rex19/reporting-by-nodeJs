const User  = require('../proxy').User;
const logger = require('../common/logger');



exports.index = function(req,res,next){

  User.getAllUser(function(err,data){
    if(err){ logger.error(err)}else {
    res.send(data)};
  });
  // User.getAllUser(function(promise){
  //   promise.then(function(data) {
  //      res.send(data);
  //   })
  // })
}
