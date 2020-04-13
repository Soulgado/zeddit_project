const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Subzeddit = require('../models/subzeddit');
const PostRating = require('../models/postsRating');
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
  async.waterfall([
    function(callback) {
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
            callback(null, 'error')
          } else {
            callback(null, subzeddit.posts[0]);
      }
    });
  },
  function(post, callback) {
    async.parallel({
      upvotes: function(callback) {
        PostRating
          .aggregate()
          .match({
            post: post._id,
            rating: 1
          })
          .count('rating')
          .exec(callback);
      },
        downvotes: function(callback) {
          PostRating
          .aggregate()
          .match({
            post: post._id,
            rating: -1
          })
          .count('rating')
          .exec(callback);
        }
      }), function(err, results) {
        console.log(results);
        if (err) { return next(err); }
        res.json({ post: post, upvotes: result[0], downvotes: results[1] });
      }
   }
  ]);
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

exports.rate_post = function(req, res, next) {
  // get user and post
  // check for existing relationship
  // if exists - update
  // if not - create
  async.waterfall([
    function(callback) {
      async.parallel({
        user: function(callback) {
          User
            .findById(req.body.user._id)
            .exec(callback)
        },
        post: function(callback) {
          Post
            .findById(req.body.post._id)
            .exec(callback)
        },
      }, function(err, results) {
        if (err) { return next(err); }
        if (results.user==null || results.post == null) {
          let err = new Error('Data is not found');
          err.status = 404;
          return next(err);
        }
        callback(null, results);  // waterfall callback 
      }
    )},
    function(results, callback) {
      PostRating
        .findOne({
          user: results.user._id,
          post: results.post._id
        })
        .exec(callback)
    }, function(err, result) {
      if (err) { return next(err); }
      if (result==null) {
        PostRating.create({
          user: req.body.user._id,
          post: req.body.post._id,
          rating: req.body.rate
        })
        return next();
      } else {
        result.rating = req.body.rate;
        result.save();
        return next();
      }
    }
  ]
)}

exports.get_post_rating = 
  function(req, res, next) {
    
}