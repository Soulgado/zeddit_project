const db = require('../db');
const { body, validationResult } = require('express-validator');

exports.create_account = [
  body('username').trim().notEmpty().isAscii().isLength({ min: 3}),
  body('password').trim().notEmpty().isLength({ min: 5, max: 60 }),
  body('email').trim().notEmpty().isEmail().normalizeEmail(),

  (req, res) => {
  // add encryption (bscrypt?)
  // send e-mail confirmation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      result: 'error',
      errors: errors.array()
    })
  }
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
  db.tx('create_subscription', async t => {
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
  db.tx('delete_subscription', async t => {
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
  body('id').trim().toInt().isInt(), // change after id type

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
      sub.subscriber,
      sub.subzeddit,
      subzeddit.title,
      subzeddit.creation_date,
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

exports.get_upvoted_posts = function(req, res) {
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

// unite these two controllers??

exports.get_downvoted_posts = function(req, res) {
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