const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.get('/',user.index);

router.get('/test',user.index);


module.exports = router;
