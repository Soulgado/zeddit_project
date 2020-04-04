const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Subzeddit = require('../models/subzeddit');

exports.post_create = function(req, res) {
  // + get subzeddit to add post to
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
            res.json({ result: 'error' });
          } else {
            res.json({ result: 'success', data: data });
          }
        })
    }
  ])
}

exports.post_detail = function(req, res) {
  // get one post

}

exports.post_comment = function(req, res) {
  // first get post object =>
  // create and add comment to the post
}