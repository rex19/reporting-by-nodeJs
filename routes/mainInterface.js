/**
 * Created by rex.ni on 2016/11/5.
 */
const express = require('express');
const router = express.Router();

const mainInterface = require('../controllers/mainInterface')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

router.get('/',mainInterface.show);

router.get('/Andon',mainInterface.andon);

router.get('/ShiftA',mainInterface.shiftA);

router.get('/ShiftB',mainInterface.shiftB);

router.get('/ShiftC',mainInterface.shiftC);

module.exports = router;
