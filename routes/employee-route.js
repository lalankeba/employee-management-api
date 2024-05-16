const express = require('express');
const { getEmployees, getEmployee, getOtherEmployee, updateEmployee, updateOtherEmployee, deleteEmployee } = require('../controllers/employee-controller');
const passport = require('passport');
const checkRoles = require('../middleware/check-roles');

const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Returns a list of employees.
 *     description: Admins can retrieve list of employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page, 
 *         in: query, 
 *         description: Page number. Starting from 0,
 *         required: false
 *         schema:
 *           type: integer
 *       - name: size, 
 *         in: query, 
 *         description: Number of employees to be retrieved. Max is 100,
 *         required: false
 *         schema:
 *           type: integer
 *     responses: 
 *       200:
 *         description: List of employees
 *       401:
 *         description: No permissions to retrieve list of employees
 *       500:
 *         description: Invalid input
 *         
 */
router.get('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getEmployees);

router.get('/employee', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), getEmployee);
router.get('/employee/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getOtherEmployee);
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), updateEmployee);
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), updateOtherEmployee);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), deleteEmployee);

module.exports = router;