/**
 * Created by rex.ni on 2016/11/18.
 */
const express = require('express');
const router = express.Router();
const editShiftInputHistory = require('../controllers/editShiftInputHistory');

router.get('/',editShiftInputHistory.show);

router.post('/update',editShiftInputHistory.update);
/*
router.get('/update',function(req ,res){
    res.send('ok');
});
*/

module.exports = router;