/**
 * Created by rex.ni on 2016/11/7.
 */
const express = require('express');
const router = express.Router();

const brokenDownTimeRate = require('../controllers/brokenDownTimeRate')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

// router.get('/',brokenDownTimeRate.show);
router.get('/:id1/:id2',brokenDownTimeRate.show);

module.exports = router;
