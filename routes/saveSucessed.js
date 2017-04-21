/**
 * Created by rex.ni on 2016/11/16.
 */
const express = require('express');
const router = express.Router();

const saveSucessed = require('../controllers/saveSucessed')

// router.get('/',function(req ,res){
//     res.send('ok');
// });
//
router.get('/',saveSucessed.show);


module.exports = router;
