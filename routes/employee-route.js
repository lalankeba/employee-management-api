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

/**
 * @swagger
 * /employees/employee:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Returns the logged in employee.
 *     description: Returns the currently logged in employee.
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Logged in employee
 *       500:
 *         description: Invalid input
 *         
 */
router.get('/employee', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), getEmployee);

/**
 * @swagger
 * /employees/employee/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Returns an employee by id
 *     description: Admins can view an employee by id
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Details of an employee
 *       404:
 *         description: No employee for the id
 *       500:
 *         description: Invalid input
 *         
 */
router.get('/employee/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getOtherEmployee);

/**
 * @swagger
 * /employees/employee/{id}:
 *   put:
 *     tags:
 *       - Employees
 *     summary: Updates logged in employee
 *     description: Any employee can update his/her own information
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Updated details of the logged in employee
 *       500:
 *         description: Invalid input
 *         
 */
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags:
 *       - Employees
 *     summary: Updates an employee by id
 *     description: Admins can update an employee by id
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Updated details of an employee
 *       404:
 *         description: No employee for the id
 *       500:
 *         description: Invalid input
 *         
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), updateOtherEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: Deletes an employee by id
 *     description: Admins can delete an employee by id
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Deleted details of an employee
 *       404:
 *         description: No employee for the id
 *       500:
 *         description: Invalid input
 *         
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), deleteEmployee);

module.exports = router;