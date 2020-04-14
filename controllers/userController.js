const db = require('../db');

exports.create_account = function(req, res) {
  // add encryption (bscrypt?)
  // send e-mail confirmation
  db.none(
    'INSERT INTO users(username, password, email) VALUES($1, $2, $3)', 
    [req.body.username, req.body.password, req.body.email])
    .then(() => {
      res.json({ result: 'success' });
    })
    .catch(error => {
      res.status(400).json({ result: 'error' });  // create frontend handler for errors
      console.log(error);
    })
}

exports.sign_in = function(req, res) {
  // add decryption of the password
  db.one(
    'SELECT * FROM users WHERE username=$1 AND password=$2',
    [req.body.username, req.body.password])
    .then(data => {
      res.json({ result: 'success', user: data })
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ result: 'error'})
    })
  }

exports.subscribe_to_subzeddit = function(req, res) {
  // to be implemented
}

