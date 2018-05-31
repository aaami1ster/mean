var express = require('express');
var mongoose = require('mongoose');
var Department = mongoose.model('Department');
var router = express.Router();
router.get('/departments', function (req, res, next) {
	Department.find().sort('name').exec(function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});
router.get('/departments/:departmentId', function (req, res, next) {
  Department.findOne({
    _id: req.params.departmentId
  }, function (error, results) {
    if (error) {
      return next(error);
}
    res.json(results);
  });
});
module.exports = router;