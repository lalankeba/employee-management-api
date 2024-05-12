const express = require('express');
const { getEmployees, getEmployee, getOtherEmployee, updateEmployee, updateOtherEmployee, deleteEmployee } = require('../controllers/employee-controller');
const passport = require('passport');
const checkRoles = require('../middleware/check-roles');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getEmployees);
router.get('/employee', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), getEmployee);
router.get('/employee/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getOtherEmployee);
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), updateEmployee);
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), updateOtherEmployee);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), deleteEmployee);

module.exports = router;