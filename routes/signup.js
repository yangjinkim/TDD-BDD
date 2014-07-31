var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
  res.render('signup', {title: 'signup page'});
});

module.exports = router;
