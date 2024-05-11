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
        const { id } = req.params;
        const employee = await employeeModel.findById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: `Employee cannot be found for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.employee.id;
        const updatedProduct = await employeeModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: `Cannot update product for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateOtherEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await employeeModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: `Cannot update product for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productSchema.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ message: `Cannot delete product for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getEmployees, getEmployee };