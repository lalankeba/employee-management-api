const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: "Employee Management API Doc",
        version: "1.0.0",
        description: "This is the documentation of the employee management API.",
        contact: {
            name: "API Support",
            email: "lalankeba@gmail.com"
        }
    },
    components: {
      schemas: {
        Employee: require(path.join(__dirname, 'docs/schemas/employee-schema.json')).Employee,
        LoginInfo: require(path.join(__dirname, 'docs/schemas/login-info.json')).LoginInfo
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Development server"
        }
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;