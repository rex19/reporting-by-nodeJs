/**
 * Created by rex.ni on 2016/12/12.
 */

const express = require('express');
const router = express.Router();
const shiftInputHistory = require('../controllers/shiftInputHistory');



/* GET home page. */
router.get('/',shiftInputHistory.show);

router.get('/list',shiftInputHistory.list);

router.get('/shiftInputHanderData',shiftInputHistory.shiftInputHanderData);

router.get('/editShiftInputHistory/:id',shiftInputHistory.EditShiftInputHistory);

router.get('/delete/:id',shiftInputHistory.delete);

module.exports = router;
