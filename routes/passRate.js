/**
 * Created by rex.ni on 2016/11/7.
 */
const express = require('express');
const router = express.Router();

const passRate = require('../controllers/passRate')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

// router.get('/',passRate.show);
router.get('/:id1/:id2',passRate.show);

module.exports = router;
