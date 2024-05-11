# employee-management-api

Employee management system developed with Node.js, Express and MongoDB.

## Setup
1. Clone the repository
2. Install the required dependencies by executing `npm install`
3. Create a `.env` file with following contents.
```
MONGO_URI="<connection-string>"
PORT=<desired-port>
```
4. Use `npm run dev` command to run the app.

## Sample Requests

### Check system
```
curl http://localhost:3000/
curl http://localhost:3000/home
```

### Get Employees
```
curl http://localhost:3000/employees
```