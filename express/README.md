# Introduction to Express
## Generating an Express App
1. install express
    ```shell
    npm install express-generator -g
    ```
1. create new project
    ```shell
    express --view=pug myapp
    ```
1. install dependencies
    ```shell
    cd myapp
    ```
    ```shell
    npm install
    ```
1. Starting the Server 
    ```shell
    node bin/www 
    ```
    or 
    ```shell
    npm start
    ```

1. Defining Routes
    
    add _routes/employee.js_
    ```javascript
    var express = require('express');
    var mongoose = require('mongoose');
    var Employee = mongoose.model('Employee');
    var department = mongoose.model('Department');
    var router = express.Router();
    router.get('/employees', function(req, res, next) {
      Employee.find().sort('name.last').exec(function(error, results) {
        if (error) { return next(error); }
        res.header("Access-Control-Allow-Origin", "*");
        // Respond with valid data
        res.json(results);
      });
    });
    router.get('/employees/:employeeId', function(req, res, next) {
      Employee.findOne({
        id: req.params.employeeId
      }).populate('department').exec(function (error, results) {
        if (error) { return next(error); }
    
        // If valid user was not found, send 404
        if (!results) { return res.sendStatus(404); }
    
        // Respond with valid data
        res.json(results);
      });
    });
    router.put('/employees/:employeeId', function (req, res, next) {
      // Remove this or mongoose will throw an error
      // because we would be trying to update the mongo ID
      delete req.body._id;
      req.body.department = req.body.department._id;
      Employee.update({ id: req.params.employeeId }, req.body, function (err, numberAffected, response) {
        if (err) { return next(err); }
    
        return res.sendStatus(200);
      });
    });
    module.exports = router;
    ```
    add _routes/department.js_
    ```javascript
    var express = require('express');
    var mongoose = require('mongoose');
    var Department = mongoose.model('Department');
    var router = express.Router();
    router.get('/departments', function (req, res, next) {
        Department.find().sort('name').exec(function (error, results) {
        if (error) { return next(error); }
        // Respond with valid data
        res.json(results);
      });
    });
    router.get('/departments/:departmentId', function (req, res, next) {
      Department.findOne({_id: req.params.departmentId}, function (error, results) {
        if (error) { return next(error); }
        res.json(results);
      });
    });
    module.exports = router;
    ```
        
1. Update package.json
    ```shell
    npm install mongoose
    ```
1. Add models
    add _models/employee.js_
    ```javascript
    // Listing 9-2. Mongoose employee model
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var EmployeeSchema = new Schema({
        id: {
                type: Number,
                required: true,
                unique: true
        },
        name: {
                type: String,
                required: true
        }, 
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        image: {
            type: String,
            default: 'images/user.png'
        }
    });
    module.exports = mongoose.model('Employee', EmployeeSchema);
    ```
    add models/department.js
    ```javascript
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var DepartmentSchema = new Schema({
        name: {
            type: String,
            required: true
        }
    });
    
    module.exports = mongoose.model('Department', DepartmentSchema);
    ```
1. Update app.js
    1. add database connection 
        ```javascript
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/mydb');
        
        // Close the Mongoose connection on Control+C
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected');
                process.exit(0);
            });
        });
        require('./models/employee');
        require('./models/department');
        ```

    1. add routes
        ```javascript
        var employees = require('./routes/employees');
        var teams = require('./routes/teams');
        
        // application routes
        app.use('employees', employees);
        app.use('departments', departments);
        ```