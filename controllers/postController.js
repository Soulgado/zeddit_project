const db = require('../db');

exports.post_create = function(req, res) {
  // get User => create Post => add Post to Subzeddit and save it
  db.tx('insert-post', async t => {
    const subzeddit = await t.one('SELECT id FROM subzeddits WHERE title = $1', [req.body.subzeddit]);
    return t.one(`INSERT INTO posts(title, creator, content, creation_date, subzeddit)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, title, creator, content, creation_date, subzeddit`,
          [req.body.title, req.body.user.id, req.body.content, new Date(), subzeddit.id]);
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
        error: 'error'
      });
    });
  }

exports.post_detail = function(req, res) {
  // get Subzeddit => get post??
  db.one(
    'SELECT * FROM posts WHERE id = $1', [req.params.post]
  )
  .then(post => {
    res.json({
      result: 'success',
      data: post
    });
  }) 
  .catch(error => {
    console.log(error);
    res.status(400).json({ result: 'error' });
  })
}

exports.post_comment = function(req, res) {
  // first get post object =>
  // create and add comment to the post
  db.tx('insert-comment', async t => {
    const post = await t.one('SELECT id FROM posts WHERE id = $1', [req.body.post])
    return t.one(`INSERT INTO 
        comments(author, content, creation_time, parent_post)
        VALUES($1, $2, $3, $4) RETURNING id, author, content, creation_time, parent_post`,
        [req.body.user.id, req.body.content, new Date(), post]);
  })
  .then(comment => {
    res.json({
      result: 'success',
      data: comment
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      result: 'error'
    })
  })
}
  
exports.rate_post = function(req, res, next) {}
  // get user and post
  // check for existing relationship
  // if exists - update
  // if not - create