const bcrypt = require('bcryptjs');
const employeeModel = require('../models/employee-model');
const InvalidArgsError = require('../errors/invalid-args-error');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const register = async (firstName, lastName, gender, username, password) => {
    const oldEmployee = await employeeModel.findOne({username: username});
    if (oldEmployee) {
        throw new InvalidArgsError(`Existing employee found for the username: ${username}`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await employeeModel.create({ firstName, lastName, gender, username, password: hashedPassword });

    const employeeObj = employee.toObject();
    delete employeeObj.password;
    return employeeObj;
}

const login = async (username, password) => {
    const employee = await employeeModel.findOne({ username: username });
    if (!employee) { // no employee found for the provided username
        throw new InvalidArgsError('Credentials are invalid');
    } else {
        const isMatch = await bcrypt.compare(password, employee.password);
        if (isMatch) { // valid employee
            const token = jsonwebtoken.sign(
                { jwtid: uuidv4(), username: employee.username, roles: employee.roles }, 
                process.env.JWT_SECRET,
                { algorithm: 'HS512', expiresIn: '1d' }
            );
            return token;
        } else { // password does not match
            throw new InvalidArgsError('Credentials are invalid');
        }
    }
}

module.exports = { register, login }