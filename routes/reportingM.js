/**
 * Created by rex.ni on 2016/10/13.
 */
const express = require('express');
const router = express.Router();

const reportingM = require('../controllers/reportingM')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

router.get('/',reportingM.show);


module.exports = router;
