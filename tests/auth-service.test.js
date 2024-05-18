const employeeModel = require('../models/employee-model');
const { register, login } = require('../services/auth-service');
const mongoose = require('mongoose');
const InvalidArgsError = require('../errors/invalid-args-error');
const bcrypt = require('bcryptjs');

jest.mock('../models/employee-model');
jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashed$2a$10$WMTof/EfqMIoT2foX0N9x3NZL.XnVPn8g6value')
}));

describe('auth', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('Should register a new employee', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'John';
        const lastName = 'Doe';
        const gender = "MALE";
        const username = "john@example.com";
        const password = "Abcd@1234";
        const roles = ["EMPLOYEE"];
        
        const employee = {
            _id: id,
            firstName,
            lastName,
            gender,
            username,
            password: await bcrypt.hash(password, 10),
            roles,
            toObject: function() {
                const { password, ...rest } = this;
                return rest;
            }
        };

        employeeModel.create.mockResolvedValue(employee);

        // Act
        const registeredEmployee = await register(firstName, lastName, gender, username, password);

        // Assert
        expect(registeredEmployee).toEqual(expect.any(Object));
        expect(mongoose.Types.ObjectId.isValid(registeredEmployee._id)).toBe(true);
        expect(registeredEmployee).toHaveProperty('roles');
        expect(registeredEmployee.roles).toEqual(['EMPLOYEE']);
        expect(registeredEmployee).not.toHaveProperty('password');
    });

    it('Should not register a new employee with existing username', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId();
        const firstName = 'John';
        const lastName = 'Doe';
        const gender = "MALE";
        const username = "john@example.com";
        const password = "Abcd@1234";
        const roles = ["EMPLOYEE"];

        const employee = {
            _id: id,
            firstName,
            lastName,
            gender,
            username,
            password: await bcrypt.hash(password, 10),
            roles,
            toObject: function() {
                const { password, ...rest } = this;
                return rest;
            }
        };

        employeeModel.findOne.mockResolvedValue(employee);

        // Act & Assert
        await expect(register(firstName, lastName, gender, username, password))
            .rejects.toThrow(InvalidArgsError);
    });
});