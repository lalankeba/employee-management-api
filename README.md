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

## Documentation
After running the API you can access the swagger documentation by visiting [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Sample Requests

### Check system
```
curl http://localhost:3000/
curl http://localhost:3000/home
```

### Register employee
```
curl http://localhost:3000/auth/register/ -H 'Content-Type: application/json' \
-d '{ "firstName": "John", "lastName":"Doe", "gender":"MALE", "username": "john@gmail.com", "password": "abcd1234" }'
```

### Login employee
```
curl http://localhost:3000/auth/login/ -H 'Content-Type: application/json' \
-d '{ "username": "john@gmail.com", "password": "abcd1234" }'
```


### Get list of employees
First 5 employees can be retrieved.
```
curl http://localhost:3000/employees/ -H 'Authorization: Bearer <token>'
```

With pagination
```
curl http://localhost:3000/employees?page=1&size=5 -H 'Authorization: Bearer <token>'
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
curl -X PUT http://localhost:3000/employees/ -H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ "firstName": "Mary", "lastName":"Anne", "gender":"FEMALE" }'
```

### Update another employee
```
curl -X PUT http://localhost:3000/employees/<id> -H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ "firstName": "Mary", "lastName":"Anne", "gender":"FEMALE" }'
```


### Delete employee (need to be an admin)
```
curl -X PUT http://localhost:3000/employees/<id> -H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ "firstName": "Mary", "lastName":"Anne", "gender":"FEMALE" }'
```
