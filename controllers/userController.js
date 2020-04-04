const User = require('../models/user');

exports.create_account = function(req, res) {
  User.create({ username: req.body.username, password: req.body.password },
    function(err, newUser) {
    if (err) {
      res.json({ result: err });
    } else {
      res.json({ result: 'success'});
    }
  });
}

exports.sign_in = function(req, res) {
  User.findOne({ username: req.body.username }, 
    function(err, user) {
      if (err) {
        res.json({ result: 'error: Not found the user'});
      } else if (user.password === req.body.password) {
        res.json({ result: 'success', user: user});
      } else {
        res.json({ result: 'error: Wrong password'});
      } 
    }
  )
}

