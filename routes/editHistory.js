/**
 * Created by rex.ni on 2016/11/18.
 */
const express = require('express');
const router = express.Router();
const EditHistory = require('../controllers/editHistory');

router.get('/',EditHistory.show);

router.post('/update',EditHistory.update);
// router.get('/update',function(req ,res){
//     res.send('ok');
// });

module.exports = router;