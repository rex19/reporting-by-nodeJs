/**
 * Created by rex.ni on 2016/10/20.
 */
/**
 * Created by rex.ni on 2016/10/13.
 */
const express = require('express');
const router = express.Router();

const oeeM = require('../controllers/oeeM')

// router.get('/',function(req ,res){
//     res.send('ok');
// });

// router.get('/',oeeM.show);

router.get('/:id1/:id2',oeeM.show);
module.exports = router;
