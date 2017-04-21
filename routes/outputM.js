/**
 * Created by rex.ni on 2016/10/20.
 */

const express = require('express');
const router = express.Router();

const outputM = require('../controllers/outputM')

// router.get('/',outputM.show);

router.get('/:id1/:id2',outputM.show);

module.exports = router;
