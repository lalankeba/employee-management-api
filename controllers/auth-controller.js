const validatePassword = require('../utils/password-validator-util');
const authService = require('../services/auth-service');
const InvalidArgsError = require('../errors/invalid-args-error');

const register = async (req, res) => {
    try {
        const { firstName, lastName, gender, username, password } = req.body;
        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult.length !== 0) { // not a valid password
            throw new InvalidArgsError(`Invalid password. ${passwordValidationResult[0].message}`);
        }
        await authService.register(firstName, lastName, gender, username, password);
        res.status(201).json({ message: `Employee: ${firstName} ${lastName} registered` });
    } catch (err) {
        if (err instanceof InvalidArgsError) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new InvalidArgsError('Credentials are required');
        }
        const token = await authService.login(username, password);
        res.status(200).json({ token });
    } catch (err) {
        if (err instanceof InvalidArgsError) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = { register, login };