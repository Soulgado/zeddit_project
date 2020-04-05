const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Subzeddit = require('../models/subzeddit');

exports.post_create = function(req, res) {
  // get User => create Post => add Post to Subzeddit
  async.waterfall([
    function(callback) {
      User
        .findOne({ username: req.body.user.username })
        .exec(function(err, user) {
          if (err) {
            callback(null, 'error');
          } else {
            callback(null, user);
          }
        })
    },
    function(user, callback) {
      Post
        .create({
          title: req.body.title,
          author: user,
          content: req.body.content
        })
        .exec((err, data) => {
          if (err || user === 'error') {
            callback(null, 'error');
          } else {
            callback(null, data);
          }
        })
    },
    function(data, callback) {
      Subzeddit
        .findById(req.body.subzeddit._id)
        .exec((err, subzeddit) => {
          if (err) {
            console.log(err);
            res.end();
          } else {
            subzeddit.posts.push(data);
            res.end();
          }
        })
    }
  ], 
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created succesfully');
    }
  });
}

exports.post_detail = function(req, res) {
  Post
    .findById(req.params.id)
    .exec((err, post) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json({ post });
      }
    })
}

exports.post_comment = function(req, res) {
  // first get post object =>
  // create and add comment to the post
}