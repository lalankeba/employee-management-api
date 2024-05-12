const express = require('express');
const { getEmployees, getEmployee, getOtherEmployee, updateEmployee } = require('../controllers/employee-controller');
const passport = require('passport');
const checkRoles = require('../middleware/check-roles');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getEmployees);
router.get('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), getEmployee);
router.get('/other/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), getOtherEmployee);
router.put('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN', 'EMPLOYEE']), updateEmployee);

module.exports = router;