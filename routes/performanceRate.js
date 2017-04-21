/**
 * Created by rex.ni on 2016/11/7.
 */
const express = require('express');
const router = express.Router();

const performanceRate = require('../controllers/performanceRate')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

// router.get('/',performanceRate.show);
router.get('/:id1/:id2',performanceRate.show);

module.exports = router;
