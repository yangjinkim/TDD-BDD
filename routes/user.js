var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/me', function(req, res) {

  var user = {
    id : 'yangjin',
    username : 'KimYangJin',
    email : 'yangjinkim@gmail.com',
    age: 15
  };

	res.json(user);
});

module.exports = router;
