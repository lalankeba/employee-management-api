# employee-management-api

Employee management system developed with Node.js, Express and MongoDB.

## Setup
1. Clone the repository
2. Install the required dependencies by executing `npm install`
3. Create a `.env` file with following contents.
```
MONGO_URI="<connection-string>"
PORT=<desired-port>
JWT_SECRET=<secret-key>
```
4. Use `npm run dev` command to run the app.

## Sample Requests

### Check system
```
curl http://localhost:3000/
curl http://localhost:3000/home
```

### Register Employee
```
curl http://localhost:3000/auth/register/ -H 'Content-Type: application/json' -d '{ "firstName": "John", "lastName":"Doe", "gender":"MALE", "username": "john@gmail.com", "password": "abcd1234" }'
```

### Login employee
curl http://localhost:3000/auth/login/ -H 'Content-Type: application/json' -d '{ "username": "john@gmail.com", "password": "abcd1234" }'


### Get Employees
First 5 employees can be retrieved.
```
curl http://localhost:3000/employees/ -H 'Authorization: Bearer <token>' | jq .
```

With pagination
```
curl http://localhost:3000/employees?page=1&size=5 -H 'Authorization: Bearer <token>'
```