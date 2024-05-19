# employee-management-api

This project is built with Node.js, Express, and MongoDB. It provides a simple API for managing employee data within an organization. The application supports user authentication through JSON Web Tokens (JWT), ensuring secure access to various functionalities based on user roles.

## Features

- **Employee Registration & Login**: Employees can register for an account and log in to access their profile.
- **JWT Authentication**: Secure access to the API using JSON Web Tokens.
- **Employee Self-Management**: Any employee can view and update their own profile information.
- **Admin Privileges**:
  - View all employees.
  - Change employee roles.
  - Delete employee records.
- **Password Policies**: Enforced password complexity requirements.
- **Token Expiration**: Implemented token expiration for enhanced security.

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd employee-management-api`
3. Install the required dependencies: `npm install`
4. Set up environment variables (e.g., Port, MongoDB connection string, JWT secret). Create a `.env` file with following contents.
```
MONGO_URI="<connection-string>"
PORT=<desired-port>
JWT_SECRET=<secret-key>
```
5. Start the server: `npm run dev`

## Post-Installation

1. Register the first employee through the API.
2. Perform database seeding to assign the ADMIN role to the first employee:
   1. Access your MongoDB instance.
   2. Find the newly registered employee document in the employees collection.
   3. Update the employee’s roles array by adding ADMIN.

## Running Tests

To run the tests for this project, use the following command:
```
npm test
```

## Swagger Documentation

You can access the Swagger documentation for this API by visiting: [http://localhost:<port>/api-docs/](http://localhost:<port>/api-docs/)

## API Endpoints

- `GET /`: Returns welcome message
- `POST /auth/register`: Register a new employee.
- `POST /auth/login`: Admin or employee login.
- `GET /employees`: Get a list of employees. (Admins only)
- `GET /employees/employee`: View logged-in employees profile.
- `GET /employees/employee/:id`: View any employee data. (Admins only)
- `PUT /employees`: Update logged-in employee data.
- `PUT /employees/:id`: Update any employee data. (Admins only)
- `DELETE /employees/:id`: Delete an employee. (Admins only)

## Sample Requests

### Check system
```
curl http://localhost:3000/
curl http://localhost:3000/home
```

### Register employee
```
curl http://localhost:3000/auth/register/ -H 'Content-Type: application/json' \
-d '{
    "firstName": "John",
    "lastName":"Doe",
    "gender":"MALE",
    "username": "john@example.com",
    "password": "Abcd@1234"
}'
```

### Login employee
```
curl http://localhost:3000/auth/login/ -H 'Content-Type: application/json' \
-d '{ 
    "username": "john@example.com", 
    "password": "Abcd@1234" 
}'
```


### Get list of employees
If you don't specify the page and the size parameters, it will return first 5 employees.
```
curl http://localhost:3000/employees/ -H 'Authorization: Bearer <token>'
```

For more information, specify page and size parameters.
```
curl http://localhost:3000/employees?page=1&size=10 -H 'Authorization: Bearer <token>'
```

### Get logged in employee
```
curl http://localhost:3000/employees/employee/ -H 'Authorization: Bearer <token>'
```

### Get another employee
```
curl http://localhost:3000/employees/employee/<id> -H 'Authorization: Bearer <token>'
```

### Update logged in employee
```
curl -X PUT http://localhost:3000/employees/ \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
    "firstName": "Mary", 
    "lastName":"Anne", 
    "gender":"FEMALE" 
}'
```

### Update another employee
```
curl -X PUT http://localhost:3000/employees/<id> \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ 
    "firstName": "Mary", 
    "lastName":"Anne", 
    "gender":"FEMALE" 
}'
```


### Delete employee (need to be an admin)
```
curl -X DELETE http://localhost:3000/employees/<id> \
-H 'Authorization: Bearer <token>'
```
