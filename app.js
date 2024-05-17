require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const homeRoute = require('./routes/home-route');
const employeeRoute = require('./routes/employee-route');
const authRoute = require('./routes/auth-route');
const passport = require('passport');
const passportConfig = require('./middleware/passport-config');
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 3000;

passportConfig(passport);

const swaggerSpec = require('./swagger-spec');
const swaggerUi = require('swagger-ui-express');

app.use(logger);
app.use(express.json());
app.use(passport.initialize());

app.use('/', homeRoute);
app.use('/employees', employeeRoute);
app.use('/auth', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`);
        });        
    })
    .catch((error) => {
        console.log('Error connecting with db ', error);
    });
