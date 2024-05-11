const express = require('express');
const { init } = require('../controllers/home-controller');

const router = express.Router();

router.all('/', init);
router.all('/home', init);

module.exports = router;