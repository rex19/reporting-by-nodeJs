/**
 * Created by rex.ni on 2016/11/3.
 */
const express = require('express');
const router = express.Router();

const catalog = require('../controllers/catalog')

// router.get('/',function(req ,res){
//     res.send('ok');
// });
//
router.get('/',catalog.show);


module.exports = router;
