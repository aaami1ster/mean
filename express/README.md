# Table of Contents
1. [Install Express](#install-express)
1. [create new project](#create-new-project)
1. [install dependencies](#install-dependencies)
1. [Starting the Server](#starting-the-server)
1. [Defining Models](#defining-models)
1. [Defining Routes](#defining-routes)
1. [Update package.json](#update-packagejson)
1. [Update app.js](#update-appjs)

# Install Express
```shell
npm install express-generator -g
```
# create new project
```shell
express --view=pug myapp
```
# install dependencies
```shell
cd myapp
```
```shell
npm install
```
# Starting the Server 
```shell
node bin/www 
```
or 
```shell
npm start
```
# Defining __Models__
- add _employee.js_ and _department.js_ models from previous node project
# Defining __Routes__
- add _routes/employee.js_
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
- add _routes/department.js_
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
# Update package.json
```shell
npm install mongoose
```
# Update app.js
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
1. try it now
    ```shell
    npm start
    ```