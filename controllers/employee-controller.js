const employeeService = require('../services/employee-service');
const NotFoundError = require('../errors/not-found-error');

const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = Math.min(parseInt(req.query.size) || 5, 100);
        if (page < 0) {
            res.status(400).json({ message: `The page: ${page} parameter must be 0 or a positive integer` });
        } else if (size < 1) {
            res.status(400).json({ message: `The size: ${size} parameter must be a positive integer` });
        } else {
            const employees = await employeeService.getEmployees(page, size);
            res.status(200).json(employees);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const employee = await employeeService.getEmployee(loggedInEmployeeId);
        res.status(200).json(employee);
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const getOtherEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) {
            res.status(400).json({ message: `Access denied. Use self API to get yourself` });
        } else {
            const employee = await employeeService.getEmployee(id);
            res.status(200).json(employee);
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const updateEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { firstName, lastName, gender } = req.body;
        const updatedEmployee = await employeeService.updateEmployee(loggedInEmployeeId, firstName, lastName, gender);
        res.status(200).json(updatedEmployee);
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const updateOtherEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) {
            res.status(400).json({ message: `Access denied. Use self API to update yourself` });
        } else {
            const { firstName, lastName, gender, roles } = req.body;
            const updatedEmployee = await employeeService.updateOtherEmployee(id, firstName, lastName, gender, roles);
            res.status(200).json(updatedEmployee);
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const loggedInEmployeeId = req.user.id;
        const { id } = req.params;
        if (loggedInEmployeeId === id) { // can't delete himself
            res.status(400).json({ message: `Access denied. You don't have necessary permission to delete youself` });
        } else {
            const deletedEmployee = await employeeService.deleteEmployee(id);
            res.status(200).json(deletedEmployee);
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = { getEmployees, getEmployee, getOtherEmployee, updateEmployee, updateOtherEmployee, deleteEmployee };