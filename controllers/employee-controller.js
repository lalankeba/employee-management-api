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
        const employee = await employeeModel.findById(loggedInEmployeeId);
        if (employee) {
            const employeeObj = employee.toObject();
            delete employeeObj.password; // removing hashed password
            res.status(200).json(employeeObj);
        } else {
            res.status(404).json({ message: `Employee cannot be found for id: ${loggedInEmployeeId}` });
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

const updateEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { firstName, lastName, gender } = req.body;
        const dataToBeUpdated = {firstName, lastName, gender};
        const updatedEmployee = await employeeModel.findByIdAndUpdate(loggedInEmployeeId, dataToBeUpdated, { new: true, runValidators: true });
        if (updatedEmployee) {
            const updatedEmployeeObj = updatedEmployee.toObject();
            delete updatedEmployeeObj.password; // removing hashed password
            res.status(200).json(updatedEmployeeObj);
        } else {
            res.status(404).json({ message: `Cannot update employee for id: ${loggedInEmployeeId}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateOtherEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) {
            res.status(400).json({ message: `Access denied. Use self API to update yourself` });
        } else {
            const { firstName, lastName, gender } = req.body;
            const dataToBeUpdated = {firstName, lastName, gender};
            const updatedEmployee = await employeeModel.findByIdAndUpdate(id, dataToBeUpdated, { new: true, runValidators: true });
            if (updatedEmployee) {
                const updatedEmployeeObj = updatedEmployee.toObject();
                delete updatedEmployeeObj.password; // removing hashed password
                res.status(200).json(updatedEmployeeObj);
            } else {
                res.status(404).json({ message: `Cannot update employee for id: ${id}` });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) { // can't delete himself
            res.status(400).json({ message: `Access denied. You don't have necessary permission to delete youself` });
        } else {
            const deletedEmployee = await employeeModel.findByIdAndDelete(id);
            if (deletedEmployee) {
                res.status(200).json(deletedEmployee);
            } else {
                res.status(404).json({ message: `Cannot delete employee for id: ${id}` });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getEmployees, getEmployee, getOtherEmployee, updateEmployee, updateOtherEmployee, deleteEmployee };