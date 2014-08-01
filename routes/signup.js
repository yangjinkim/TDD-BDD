var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('user');

router.get('/', function (req, res) {
  res.render('signup', {title: 'signup page'});
});

router.post('/', function(req, res) {

  req.checkBody('userId', 'Invalid User ID').notEmpty().isAlphanumeric().len(5, 15);
  req.checkBody('userPassword', 'Invalid Password').notEmpty().len(5, 15);
  req.checkBody('userEmail', 'Invalid Email').isEmail().len(5, 100);
  req.checkBody('userName', 'Invalid UserName').notEmpty().isAlpha();
  req.checkBody('userAge', 'Invalid Age').notEmpty().isInt();

  var errors = req.validationErrors();

  if (errors) {
    res.send(400);
  } else {

    var obj = new UserModel({
      id : req.body.userId, 
      password : req.body.userPassword,
      email : req.body.userEmail,
      name  : req.body.userName,
      age : req.body.userAge
    });

    obj.save(function(err){
      if(err) {
        res.send(500);
      } else {
        res.send(201);
      }
    });
  }
});

module.exports = router;

