/**
 * Created by rex.ni on 2016/10/20.
 */
/**
 * Created by rex.ni on 2016/10/13.
 */
const express = require('express');
const router = express.Router();

const cycletimeM = require('../controllers/cycletimeM')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

router.get('/',cycletimeM.show);


module.exports = router;
