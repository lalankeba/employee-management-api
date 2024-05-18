require('dotenv').config();
const employeeModel = require('../models/employee-model');
const { getEmployees, getEmployee, updateEmployee, updateOtherEmployee, deleteEmployee } = require('../services/employee-service');
const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found-error');

jest.mock('../models/employee-model');

describe('auth', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('Should get list of employees', async () => {
        // Arrange
        const existingEmployees = [
            { _id: new mongoose.Types.ObjectId(), firstName: 'John', lastName: 'Doe', gender: 'MALE', username: 'john@example.com', roles: ['EMPLOYEE'] },
            { _id: new mongoose.Types.ObjectId(), firstName: 'Lucy', lastName: 'Anne', gender: 'FEMALE', username: 'lucy@example.com', roles: ['EMPLOYEE'] },
            { _id: new mongoose.Types.ObjectId(), firstName: 'Tom', lastName: 'Kenut', gender: 'MALE', username: 'tom@example.com', roles: ['EMPLOYEE'] },
            { _id: new mongoose.Types.ObjectId(), firstName: 'Nate', lastName: 'Horton', gender: 'CUSTOM', username: 'nate@example.com', roles: ['EMPLOYEE'] },
            { _id: new mongoose.Types.ObjectId(), firstName: 'Jane', lastName: 'Mannz', gender: 'FEMALE', username: 'jane@example.com', roles: ['EMPLOYEE'] }
        ];
        const findMock = jest.fn().mockReturnThis();
        const skipMock = jest.fn().mockReturnThis();
        const limitMock = jest.fn().mockResolvedValue(existingEmployees);

        employeeModel.find = findMock;
        employeeModel.find.mockImplementation(() => ({
            skip: skipMock,
            limit: limitMock,
        }));

        // Act
        const employees = await getEmployees(0, 5);

        // Assert
        expect(Array.isArray(employees)).toBe(true);
        expect(employees.length).toBe(5);
        employees.forEach((employee) => {
            expect(employee).toHaveProperty('_id');
            expect(employee).toHaveProperty('firstName');
            expect(employee).toHaveProperty('lastName');
            expect(employee).toHaveProperty('gender');
            expect(employee).toHaveProperty('username');
            expect(employee).toHaveProperty('roles');
        });
    });

    it('Should get employee by id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const mockEmployee = { _id: id, firstName: 'Tom', lastName: 'Kenut', gender: 'MALE', username: 'tom@example.com', roles: ['EMPLOYEE'] };
        
        employeeModel.findById.mockResolvedValue(mockEmployee);

        // Act
        const employee = await getEmployee(id.toString());

        // Assert
        expect(employee).toEqual(expect.any(Object));
        expect(mongoose.Types.ObjectId.isValid(employee._id)).toBe(true);
        expect(employee).toHaveProperty('roles');
        expect(employee.roles).toEqual(['EMPLOYEE']);
        expect(employee).not.toHaveProperty('password');
    });

    it('Should not get an employee for invalid id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        
        employeeModel.findById.mockResolvedValue(undefined);

        // Act & Assert
        await expect(getEmployee(id.toString()))
            .rejects.toThrow(NotFoundError);
    });

    it('Should update an employee', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'Liyam';
        const lastName = 'Nizam';
        const gender = 'FEMALE';
        const mockEmployee = { _id: id, firstName: firstName, lastName: lastName, gender: gender, username: 'liyam@example.com', roles: ['EMPLOYEE'] };

        const findByIdAndUpdateMock = jest.fn().mockReturnThis();
        const selectMock = jest.fn().mockResolvedValue(mockEmployee);

        employeeModel.findByIdAndUpdate = findByIdAndUpdateMock;
        employeeModel.findByIdAndUpdate.mockImplementation(() => ({
            select: selectMock
        }));

        // Act
        const employee = await updateEmployee(id.toString(), firstName, lastName, gender);

        // Assert
        expect(employee).toEqual(expect.any(Object));
        expect(mongoose.Types.ObjectId.isValid(employee._id)).toBe(true);
        expect(employee).toHaveProperty('roles');
        expect(employee.roles).toEqual(['EMPLOYEE']);
        expect(employee).not.toHaveProperty('password');
    });

    it('Should not update an employee for invalid id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'Liyam';
        const lastName = 'Nizam';
        const gender = 'FEMALE';
        const mockEmployee = { _id: id, firstName: firstName, lastName: lastName, gender: gender, username: 'liyam@example.com', roles: ['EMPLOYEE'] };

        const findByIdAndUpdateMock = jest.fn().mockReturnThis();
        const selectMock = jest.fn().mockResolvedValue(undefined);

        employeeModel.findByIdAndUpdate = findByIdAndUpdateMock;
        employeeModel.findByIdAndUpdate.mockImplementation(() => ({
            select: selectMock
        }));

        // Act & Assert
        await expect(updateEmployee(id.toString(), firstName, lastName, gender))
            .rejects.toThrow(NotFoundError);
    });

    it('Should update other employee', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'Liyam';
        const lastName = 'Nizam';
        const gender = 'FEMALE';
        const roles = ['EMPLOYEE'];
        const mockEmployee = { _id: id, firstName: firstName, lastName: lastName, gender: gender, username: 'liyam@example.com', roles: roles };

        const findByIdAndUpdateMock = jest.fn().mockReturnThis();
        const selectMock = jest.fn().mockResolvedValue(mockEmployee);

        employeeModel.findByIdAndUpdate = findByIdAndUpdateMock;
        employeeModel.findByIdAndUpdate.mockImplementation(() => ({
            select: selectMock
        }));

        // Act
        const employee = await updateOtherEmployee(id.toString(), firstName, lastName, gender, roles);

        // Assert
        expect(employee).toEqual(expect.any(Object));
        expect(mongoose.Types.ObjectId.isValid(employee._id)).toBe(true);
        expect(employee).toHaveProperty('roles');
        expect(employee.roles).toEqual(['EMPLOYEE']);
        expect(employee).not.toHaveProperty('password');
    });

    it('Should not update other employee for invalid id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'Liyam';
        const lastName = 'Nizam';
        const gender = 'FEMALE';
        const roles = ['EMPLOYEE'];

        const findByIdAndUpdateMock = jest.fn().mockReturnThis();
        const selectMock = jest.fn().mockResolvedValue(undefined);

        employeeModel.findByIdAndUpdate = findByIdAndUpdateMock;
        employeeModel.findByIdAndUpdate.mockImplementation(() => ({
            select: selectMock
        }));

        // Act & Assert
        await expect(updateOtherEmployee(id.toString(), firstName, lastName, gender, roles))
            .rejects.toThrow(NotFoundError);
    });

    it('Should delete an employee by id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const mockEmployee = { _id: id, firstName: 'Tom', lastName: 'Kenut', gender: 'MALE', username: 'tom@example.com', roles: ['EMPLOYEE'],
            toObject: function() {
                const { password, ...rest } = this;
                return rest;
            }
        };
        
        employeeModel.findByIdAndDelete.mockResolvedValue(mockEmployee);

        // Act
        const employee = await deleteEmployee(id.toString());

        // Assert
        expect(employee).toEqual(expect.any(Object));
        expect(mongoose.Types.ObjectId.isValid(employee._id)).toBe(true);
        expect(employee).toHaveProperty('roles');
        expect(employee.roles).toEqual(['EMPLOYEE']);
        expect(employee).not.toHaveProperty('password');
    });

    it('Should not delete an employee for invalid id', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();

        employeeModel.findByIdAndDelete.mockResolvedValue(undefined);

        // Act & Assert
        await expect(deleteEmployee(id.toString()))
            .rejects.toThrow(NotFoundError);
    });

});