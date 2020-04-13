const db = require('../db');

exports.subzeddit_create = function(req, res) {
// first get User and then create subzeddit
  db.one(
    'INSERT INTO subzeddits(title, creator, creation_date) VALUES($1, $2, SELECT CURRENT_DATE)',
    [req.body.title, req.body.user.id]
  )
  .then(subzeddit => {
    res.json({
      result: 'success',
      data: subzeddit
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      result: 'error'
    })
  })
}

exports.subzeddit_all = function(req, res) {
  db.any(
    'SELECT * from subzeddits'
  )
  .then(data => {
    res.json({
      result: 'success',
      data: data
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      result: 'error'
    })
  })
}

exports.get_subzeddit = function(req, res) {
  db.any(
    'SELECT * from subzeddits WHERE title=$1',
    [req.params.title]
  )
  .then(subzeddit => {
    res.json({
      result: 'success',
      data: subzeddit
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      result: 'error'
    })
  })
}