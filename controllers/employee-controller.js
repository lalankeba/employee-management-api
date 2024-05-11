const employeeModel = require('../models/employee-model');

const getEmployees = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const size = req.query.size || 5;
        const employees = await employeeModel
            .find({}, { firstName: 1, lastName: 1, gender: 1, username: 1, roles: 1 })
            .skip(page * size)
            .limit(size);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) { // currently logged in user checks own data
            const employee = await employeeModel.findById(id);
            if (employee) {
                const employeeObj = employee.toObject();
                delete employeeObj.password; // removing hashed password
                res.status(200).json(employeeObj);
            } else {
                res.status(404).json({ message: `Employee cannot be found for id: ${id}` });
            }
        } else { // currently logged in user checks other's data
            res.status(401).json({ message: `Can't access other employees data` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getOtherEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeModel.findById(id);
        if (employee) {
            const employeeObj = employee.toObject();
            delete employeeObj.password; // removing hashed password
            res.status(200).json(employeeObj);
        } else {
            res.status(404).json({ message: `Employee cannot be found for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getEmployees, getEmployee, getOtherEmployee };