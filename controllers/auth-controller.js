const employeeModel = require('../models/employee-model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const validatePassword = require('../utils/password-validator-util');
const authService = require('../services/auth-service');
const InvalidArgsError = require('../errors/invalid-args-error');

const register = async (req, res) => {
    try {
        const { firstName, lastName, gender, username, password } = req.body;
        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult.length !== 0) { // not a valid password
            throw new InvalidArgsError(`Invalid password. ${passwordValidationResult[0].message}`);
        }
        await authService.register(firstName, lastName, gender, username, password);
        res.status(201).json({ message: `Employee: ${firstName} ${lastName} registered` });
    } catch (err) {
        if (err instanceof InvalidArgsError) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Credentials are required');
        }
        const employee = await employeeModel.findOne({ username: username });
        if (!employee) { // no employee found for the provided username
            res.status(400).json({ message: 'Credentials are invalid' });
        } else {
            const isMatch = await bcrypt.compare(password, employee.password);
            if (!isMatch) { // password does not match
                res.status(400).json({ message: 'Credentials are invalid' });
            } else { // valid employee
                const token = jsonwebtoken.sign(
                    { jwtid: uuidv4(), username: employee.username, roles: employee.roles }, 
                    process.env.JWT_SECRET,
                    { algorithm: 'HS512', expiresIn: '1d' }
                );
                res.status(200).json({ token });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login };