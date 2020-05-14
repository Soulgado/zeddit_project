const db = require('../db');
const { body, param, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create_account = [
  body('username').trim().notEmpty().isAscii().isLength({ min: 3}),
  body('password').trim().notEmpty().isLength({ min: 5, max: 60 }),
  body('email').trim().notEmpty().isEmail().normalizeEmail(),

  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
  // check for existing username 
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    db.none(
      'INSERT INTO users(username, password, email) VALUES($1, $2, $3)', 
      [req.body.username, hash, req.body.email])
      .then(() => {
        res.json({ result: 'success' });
      })
      .catch(error => {
        res.status(400).json({ result: 'error' });  
        console.log(error);
      })
  })
}]

exports.sign_in = [
  body('username').trim().notEmpty().isAscii(),
  body('password').trim().notEmpty().isLength({ min: 5, max: 60 }),

  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
  db.one(
    `SELECT * FROM users WHERE username=$1`,
    req.body.username)
    .then(user => {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result) {
          user.password = req.body.password;
          res.json({ result: 'success', user });
        } else {
          res.json({ result: 'error', errors: 'Wrong password'});
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ result: 'error'})
    })
  }]

exports.subscribe_to_subzeddit = [
  body('subzeddit').trim().isAscii(),
  // only send user id

  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
  // get subzeddit, subscribe (ToDo: add checking user later)
  // add check for subzeddit 
  db.tx('create_subscription', async t => {
    await t.none('UPDATE subzeddits SET subscriptions = subscriptions + 1 WHERE title = $1', req.body.subzeddit);
    const subzeddit = await t.one('SELECT id FROM subzeddits WHERE title = $1', [req.body.subzeddit]);
    return t.one(`INSERT INTO subzeddit_subscriptions(subscriber, subzeddit)
          VALUES ($1, $2)
          RETURNING id, subscriber, subzeddit`,
          [req.body.user.id, subzeddit.id]);
  })
  .then(data => {
    res.json({
      result: 'success',
      data: data
    });
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: 'error'
    });
  });
}]

exports.unsubscribe_from_subzeddit = [
  body('subzeddit').trim().isAscii(),

  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
  // ToDo: check for existing subscription
  db.tx('delete_subscription', async t => {
    await t.none('UPDATE subzeddits SET subscriptions = subscriptions - 1 WHERE title = $1', req.body.subzeddit);
    const subzeddit = await t.one('SELECT id FROM subzeddits WHERE title = $1', [req.body.subzeddit]);
    return t.none(`DELETE FROM subzeddit_subscriptions
          WHERE subscriber = $1 AND subzeddit = $2`,
          [req.body.user.id, subzeddit.id]);
  })
  .then(() => {
    res.json({
      result: 'success'
    })
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: 'error'
    })
  })
}]

exports.get_user_subscriptions = [
  param('id').trim().isInt(), // change after id type

  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
  db.any(
    `
    SELECT 
      sub.id subscription_status,
      sub.subscriber,
      sub.subzeddit,
      subzeddit.title,
      subzeddit.creation_date,
      subzeddit.subscriptions,
      creator.username
    FROM subzeddit_subscriptions sub 
    LEFT JOIN subzeddits subzeddit ON sub.subzeddit = subzeddit.id
    LEFT JOIN users creator ON subzeddit.creator = creator.id
    WHERE sub.subscriber = $1`
    , req.params.id
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
}]

exports.get_upvoted_posts = [
  param('id').trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: 'error',
        errors: errors.array()
      })
    }
    db.any(
      `SELECT 
      post.id,
      post.title,
      post.content,
      post.creation_date,
      post.upvotes,
      post.downvotes,
      creator.username,
      subzeddit.title subzeddit_title
    FROM posts_rating rated
    LEFT JOIN posts post ON rated.post = post.id
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    WHERE rated.user_id = $1 AND rated.rating = 1`,
      req.params.id
    )
      .then(data => {
        res.json({
          result: 'success',
          data: data
        })
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({
          result: 'error'
        })
      })
  }
]
// unite these two controllers??

exports.get_downvoted_posts = [
  param('id').trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: 'error',
        errors: errors.array()
      })
    }
    db.any(
      `SELECT 
      post.id,
      post.title,
      post.content,
      post.creation_date,
      post.upvotes,
      post.downvotes,
      creator.username,
      subzeddit.title subzeddit_title
    FROM posts_rating rated
    LEFT JOIN posts post ON rated.post = post.id
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    WHERE rated.user_id = $1 AND rated.rating = -1`,
      req.params.id
    )
      .then(data => {
        res.json({
          result: 'success',
          data: data
        })
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({
          result: 'error'
        })
      })
  }
];