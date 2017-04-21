/**
 * Created by rex.ni on 2016/11/2.
 */

const express = require('express');
const router = express.Router();
const history = require('../controllers/history')



/* GET home page. */
router.get('/',history.show)

router.get('/list',history.list);

// /history/handerData
router.get('/handerData',history.handerData);

router.get('/EditHistory/:id',history.EditHistory);

router.get('/delete/:id',history.delete);

module.exports = router;
