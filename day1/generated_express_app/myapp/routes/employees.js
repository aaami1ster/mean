var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var department = mongoose.model('Department');
var router = express.Router();
router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error, results) {
    if (error) { return next(error); }
    
    // Respond with valid data
    res.json(results);
  });
});
router.get('/employees/:employeeId', function(req, res, next) {
  Employee.findOne({
    _id: req.params.employeeId
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