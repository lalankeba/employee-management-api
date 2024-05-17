const employeeModel = require('../models/employee-model');
const NotFoundError = require('../errors/not-found-error');

const getEmployees = async (page, size) => {
    const employees = await employeeModel
        .find({}, { firstName: 1, lastName: 1, gender: 1, username: 1, roles: 1 })
        .skip(page * size)
        .limit(size);
    return employees;
}

const getEmployee = async (id) => {
    const employee = await employeeModel.findById(id, { firstName: 1, lastName: 1, gender: 1, username: 1, roles: 1, createdAt: 1, updatedAt: 1 });
    if (employee) {
        return employee;
    } else {
        throw new NotFoundError(`Employee cannot be found for id: ${id}`);
    }
}

const updateEmployee = async (id, firstName, lastName, gender) => {
    const dataToBeUpdated = {firstName, lastName, gender};
    const updatedEmployee = await employeeModel.findByIdAndUpdate(id, dataToBeUpdated, 
        { new: true, runValidators: true })
        .select({ firstName: 1, lastName: 1, gender: 1, username: 1, roles: 1, createdAt: 1, updatedAt: 1 });
    if (updatedEmployee) {
        return updatedEmployee;
    } else {
        throw new NotFoundError(`Cannot update employee for id: ${id}`);
    }
}

const updateOtherEmployee = async (id, firstName, lastName, gender, roles) => {
    const dataToBeUpdated = {firstName, lastName, gender, roles};
    const updatedEmployee = await employeeModel.findByIdAndUpdate(id, dataToBeUpdated, 
        { new: true, runValidators: true })
        .select({ firstName: 1, lastName: 1, gender: 1, username: 1, roles: 1, createdAt: 1, updatedAt: 1 });
    if (updatedEmployee) {
        return updatedEmployee;
    } else {
        throw new NotFoundError(`Cannot update employee for id: ${id}`);
    }
}

const deleteEmployee = async (id) => {
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);
    if (deletedEmployee) {
        const deletedEmployeeObj = deletedEmployee.toObject();
        delete deletedEmployeeObj.password;
        return deletedEmployeeObj;
    } else {
        throw new NotFoundError(`Cannot delete employee for id: ${id}`);
    }
}

module.exports = { getEmployees, getEmployee, updateEmployee, updateOtherEmployee, deleteEmployee }