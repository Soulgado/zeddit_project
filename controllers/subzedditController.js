const Subzeddit = require('../models/subzeddit.js');
const User = require('../models/user');

exports.subzeddit_create = function(req, res) {
// first get User and then create subzeddit
  console.log(req.body);
  Subzeddit.create(
    { 
      title: req.body.title,
      creator: req.body.user
    }
  ).exec(
    function(err, result) {
      if (err) {
        res.end();
      } else {
        res.end();
      }
    }
  );
  /*
  async.waterfall([
    function(callback) {
      User
        .findById(req.body.user._id)
        .exec(function(err, user) {
          if (err) {
            callback(null, 'error');
          } else {
            callback(null, user);
          }
        });
    },
    function(user, callback) {
      console.log(user)
      Subzeddit.create(
        { 
          title: req.body.title,
          creator: user
        }
      ).exec(
        function(err, result) {
          if (err) {
            res.json({ result: 'error'});
          } else {
            res.json({ result: 'success' });
          }
        }
      )
    }
  ])
  */
}

exports.subzeddit_all = function(req, res) {
  Subzeddit.find({}, function(err, result) {
    if (err) {
      res.json({ result: 'not found'});
    } else {
      res.json({ result: {
        number: result.length,
        subzeddits: result
      }})
    }
  });
}

exports.get_subzeddit = function(req, res) {
  Subzeddit
    .findOne({ title: req.params.subzeddit })  // aslo populate Posts field
    .populate('posts')
    .exec(function(err, data) {
      if (err) {
        res.json({ result: 'error' });
      } else {
        res.json({ result: 'success', data: data })
      }
    })
}