
/**
 * Created by rex.ni on 2016/11/2.
 */
const express = require('express');
const router = express.Router();
//引入Controllers层
const ProductShiftInput = require('../controllers/ProductShiftInput')


//设置路由指向Controllers的方法
router.get('/',ProductShiftInput.show);


router.post('/addInput',ProductShiftInput.addInput);

module.exports = router;


//测试路由是否ok
// router.get('/',function(req ,res){
//     res.send('ok');
// });
// module.exports = router;