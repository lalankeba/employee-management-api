const mongoose = require('mongoose');

const employeeModel = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'CUSTOM'], required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: ['EMPLOYEE', 'ADMIN'], default: ['EMPLOYEE'] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("employees", employeeModel);
