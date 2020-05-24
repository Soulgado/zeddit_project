const db = require('../db');
const { body, query, param, validationResult } = require('express-validator');

exports.subzeddit_create = [
  body('user')
    .notEmpty().withMessage('User should be specified'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title field should not be empty'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: 'error',
        errors: errors.array()[0].msg
      })
    }
    // first get User and then create subzeddit
    // check for user auth
    db.one(
      'INSERT INTO subzeddits(title, creator, creation_date) VALUES($1, $2, $3) RETURNING id, title, creator, creation_date',
      [req.body.title, req.body.user, new Date()]
    )
      .then(subzeddit => {
        res.json({
          result: 'success',
          data: subzeddit
        })
      })
      .catch(error => {
        let msg = '';
        switch (error.constraint) {
          case 'Unique title':
            msg = 'Subzeddit with this title already exists';
            break;
          case 'User creator':
            msg = 'There is no user with such id';
            break;
          default:
            msg = 'Unknown error';
        }
        res.status(400).json({
          result: 'error',
          type: msg
        })
        console.log(error);
      })
  }
];

exports.subzeddit_all = [
  query('user')
    .trim(),
  (req, res) => {
  // get all subzeddits
  // also fetch subscription status
    let user;
    if (req.query.user) {
      user = req.query.user;
    } else {
      user = 0
    }
    db.any(
      `SELECT
      subzeddit.id,
      subzeddit.title,
      subzeddit.creation_date,
      subzeddit.subscriptions,
      subscription.id subscription_status,
      creator.username
    FROM subzeddits subzeddit
    LEFT JOIN users creator ON subzeddit.creator = creator.id
    LEFT JOIN subzeddit_subscriptions subscription ON subscription.subzeddit = subzeddit.id AND subscription.subscriber = $1
    `, user
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
];

exports.get_subzeddit = [
  param('title')
    .trim()
    .notEmpty(),
  query('user')
    .trim(),
  (req, res) => {
    let user;
    if (req.query.user) {
      user = req.query.user;
    } else {
      user = 0
    }
    db.task(async t => {
      const subzeddit = await t.one('SELECT * FROM subzeddits WHERE title = $1',
        [req.params.title]);
      const posts = await t.any(
        `SELECT 
        post.id,
        post.title,
        post.content,
        post.creation_date,
        post.upvotes,
        post.downvotes,
        post.updated,
        post.type,
        post.filename,
        post.comments,
        user_rating.rating,
        creator.username
      FROM posts post 
      LEFT JOIN users creator ON post.creator = creator.id
      LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
      WHERE subzeddit = $2 ORDER BY creation_date DESC LIMIT 10`, [user, subzeddit.id]);
      posts.forEach(post => post.subzeddit_title = subzeddit.title);
      subzeddit.posts = posts;
      return subzeddit;
    })
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
];

exports.get_subscription_info = function(req, res) {
  // check if user is subscribed to subzeddit
  const { user, subzeddit } = req.query;
  db.task(async t => {
    const user_id = await t.oneOrNone('SELECT id FROM users WHERE username = $1', user);
    const subzeddit_id = await t.oneOrNone('SELECT id FROM subzeddits WHERE title = $1', subzeddit);
    if (!user_id || !subzeddit_id) return null;
    return t.oneOrNone(
      `SELECT id FROM subzeddit_subscriptions 
      WHERE subscriber = $1 AND subzeddit = $2`,
      [user_id.id , subzeddit_id.id ]
    );
  })
  .then(data => {
    if (!data) {
      res.json({
        result: 'success',
        data: {
          subzeddit,
          status: false
        }
      });
    } else {
      res.json({
        result: 'success',
        data: {
          subzeddit,
          status: true
        }
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: 'error'
    })
  })
}

exports.get_subzeddits_titles = function(req, res) {
  db.any(
    `SELECT title
    FROM subzeddits`
  )
  .then(data => {
    res.json({
      result: 'success',
      data
    })
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: 'error'
    })
  })
}