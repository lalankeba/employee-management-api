const express = require('express');
const { init } = require('../controllers/home-controller');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieves the message whether the system is up and running
 *     responses: 
 *       200:
 *         description: Success message
 */
router.all('/', init);

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Retrieves the message whether the system is up and running
 *     responses: 
 *       200:
 *         description: Success message
 */
router.all('/home', init);

module.exports = router;