const User = require('../models/user');
const Subzeddit = require('../models/subzeddit');

exports.create_account = function(req, res) {
  // add encryption (bscrypt?)
  // send e-mail confirmation
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
  // add decryption of the password
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

exports.subscribe_to_subzeddit = function(req, res) {
  User
    .findById(req.body.user._id)
    .exec(function(err, user) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        user.subscribedSubzeddits.push(req.body.subzeddit);
        res.end();
      } 
    })
}

