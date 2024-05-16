const express = require('express');
const { register, login } = require('../controllers/auth-controller');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register an employee
 *     description: Create a new employee in the system
 *     requestBody:
 *       description: New employee details
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses: 
 *       201:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee: John Doe registered"
 *       500:
 *         description: Invalid input
 *         
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login an employee
 *     requestBody:
 *       description: Login credentials
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInfo'
 *     responses: 
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "...d3RpZCI6ImYxNjI1ZmMxLTRjZTItNGM4Ni04N2..."
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Invalid input
 *         
 */
router.post('/login', login);

module.exports = router;
