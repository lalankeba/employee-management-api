const bcrypt = require('bcryptjs');
const employeeModel = require('../models/employee-model');
const InvalidArgsError = require('../errors/invalid-args-error');

const register = async (firstName, lastName, gender, username, password) => {
    const oldEmployee = await employeeModel.findOne({username: username});
    if (oldEmployee) {
        throw new InvalidArgsError(`Existing employee found for the username: ${username}`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await employeeModel.create({ firstName, lastName, gender, username, password: hashedPassword });
    return employee;
}

module.exports = { register }