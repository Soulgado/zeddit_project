const db = require('../db');

exports.subzeddit_create = function(req, res) {
// first get User and then create subzeddit
// check for user auth
  db.one(
    'INSERT INTO subzeddits(title, creator, creation_date) VALUES($1, $2, $3) RETURNING id, title, creator, creation_date',
    [req.body.title, req.body.user.id, new Date()]
  )
  .then(subzeddit => {
    res.json({
      result: 'success',
      data: subzeddit
    })
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: 'error',
      type: error.constraint
    })
  })
}

exports.subzeddit_all = function(req, res) {
  db.any(
    `SELECT 
      subzeddit.title,
      subzeddit.creation_date,
      creator.username
    FROM subzeddits subzeddit
    LEFT JOIN users creator ON subzeddit.creator = creator.id
    `
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
        creator.username
      FROM posts post 
      LEFT JOIN users creator ON post.creator = creator.id
      WHERE subzeddit = $1 ORDER BY creation_date DESC LIMIT 10`, subzeddit.id);
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