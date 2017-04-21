/**
 * Created by rex.ni on 2016/11/7.
 */
const express = require('express');
const router = express.Router();

const timeRate = require('../controllers/timeRate')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

router.get('/',timeRate.show);

router.get('/:id1/:id2',timeRate.show);

module.exports = router;
