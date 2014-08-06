var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
  res.status(200);
  res.render('login');
});

module.exports = router;
