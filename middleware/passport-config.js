const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const employeeModel = require('../models/employee-model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const employee = await employeeModel.findOne({ username: jwtPayload.username });
                if (employee) {
                    return done(null, employee);
                }
                return done(null, false);
            } catch (err) {
                console.log(err);
                return done(err, false);
            }
        })
    );
}