// express variables;
var express = require('express'),
    router = express.Router();

// mail library
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'get/email' });
});

router.post('/', function(req, res) {

  req.checkBody('sender', 'Invalid email').notEmpty().isEmail();
  req.checkBody('receiver', 'Invalid email').notEmpty().isEmail();
  req.checkBody('title', 'Invalid title').notEmpty().len(5, 100);
  req.checkBody('body', 'Invalid title').notEmpty().len(20, 1000);

  var errors = req.validationErrors();
  
  if(errors) {
    console.log(errors);
    res.send(400);
  } else {

    var transporters = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'openknowlemail@gmail.com',
        pass: '6efb47496e0e2fb5fa6d1d91c50f671d'
      }  
    });

    var mailOptions = {
      from: req.body.sender,
      to: req.body.receiver,
      subject: req.body.title,
      text: req.body.body
    };

    transporters.sendMail(mailOptions, function(error, info) {
      if(error) {
        res.send(500, error);
      } else {
        res.send(200, info);
      }
    });

  }

});

module.exports = router;
