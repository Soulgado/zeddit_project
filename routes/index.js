var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/main', function(req, res, next) {
  res.json({
    user: 'Soul',
    data: 'This is data'
  });
});

module.exports = router;
