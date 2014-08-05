var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('user');

router.get('/', function (req, res) {
  res.render('signup', {message: 'signup page'});
});

router.post('/', function(req, res) {

  req.checkBody('userId', 'Invalid User ID').notEmpty().isAlphanumeric().len(5, 15);
  req.checkBody('userPassword', 'Invalid Password').notEmpty().len(5, 15);
  req.checkBody('userEmail', 'Invalid Email').isEmail().len(5, 100);
  req.checkBody('userName', 'Invalid UserName').notEmpty().isAlpha().len(5, 30);
  req.checkBody('userAge', 'Invalid Age').notEmpty().isInt();

  var errors = req.validationErrors();

  if (errors) {
    res.render('signup', {
      message: 'Check your information again before sending',
      error: true
    });
   } else {

    UserModel.find({id: req.body.userId}, function(err, result) {
      // user already exists
      if (result.length >= 1) {
	res.render('signup', {
	  message: 'You are already registered to Agile service',
	  error: true
	});
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
	    res.render('signup', {
	      message: 'something went wrong when it is saved',
	      error: true
	    });
	  } else {
	    res.render('signup' ,{
	      message: 'saved successfully'
	    });
	  }
	});
      }
    });
  }
});

module.exports = router;

