const checkRoles = (requiredRoles) => (req, res, next) => {
    const employeeRole = req.user.roles;
    const hasRoles = requiredRoles.some(role => employeeRole.includes(role));
    if (!hasRoles) {
        return res.status(403).json({ message: `Access denied. You don't have necessary permisions.` });
    }
    next();
}

module.exports = checkRoles;