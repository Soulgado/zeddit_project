const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Subzeddit = require('../models/subzeddit');
const async = require('async');

exports.post_create = function(req, res) {
  // get User => create Post => add Post to Subzeddit and save it
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
          content: req.body.content,
        }, function(err, post) {
          if (err || user === 'error') {
            callback(null, 'error');
          } else {
            callback(null, post);
          }
        })
    },
    function(data, callback) {
      Subzeddit
        .findById(req.body.subzeddit._id)
        .exec(function(err, subzeddit) {
          if (err) {
            console.log(err);
            res.end();
          } else {
            callback(null, subzeddit, data);
          }
        })
    },
    function(subzeddit, data, callback) {
      subzeddit.posts.push(data);
      subzeddit.save(function(err) {
        if (err) {
          console.log(err);
          res.json({ result: 'error'});
        } else {
          res.json({ resuls: 'success'});
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
  Subzeddit
    .findOne({ title: req.params.subzeddit })
    .populate({
      path: 'posts',
      match: { title: req.params.post},
      populate: {
        path: 'comments'
      }
    })
    .exec(function(err, subzeddit) {
      if (err) {
        console.log(err);
        res.json({ post: undefined });
      } else {
        res.json({ post: subzeddit.posts[0]});
      }
    });
  }

exports.post_comment = function(req, res) {
  // first get post object =>
  // create and add comment to the post
  async.waterfall([
    function(callback) {
      Comment
        .create({
          author: req.body.user,
          content: req.body.comment
        }, function(err, comment) {
          if (err) {
            console.log(err);
            callback(null, 'error');
          } else {
            callback(null, comment);
          }
        });
    },
    function(comment, callback) {
      Post
        .findOne({ _id: req.body.post._id })
        .exec(function(err, post) {
          if (err) {
            console.log(err);
            callback(null, 'error');
          } else {
            callback(null, post, comment);
          }
        });
    },
    function(post, comment, callback) {
      post.comments.push(comment);
      post.save(function(err) {
        if (err) {
          console.log(err);
          res.json({ post: 'error' });
        } else {
          res.json({ post });
        }
      });
    }
  ]);
}