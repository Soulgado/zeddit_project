const db = require('../db');
const uuid = require('uuid');

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
  db.task(async t => {
    const post = await t.one('SELECT * FROM posts WHERE id = $1', [req.params.post]);
    return post;
  })
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
  
exports.rate_post = function(req, res) {
  const { user, user_rating, post } = req.body;
  db.tx('rate-post', async t => {
    // get existing entry on post rating from user
    // update or create based on result
    const rating = await t.oneOrNone('SELECT * FROM posts_rating WHERE user_id = $1 AND post = $2', [user.id, post]);
    if (rating) {
      if (user_rating === rating.rating) return;
      else {
      await t.none(`UPDATE posts 
          SET upvotes = upvotes + $1,
              downvotes = downvotes - $1
          WHERE id = $2`,
          [user_rating, post])
      }
      return t.none(`UPDATE posts_rating
          SET rating = $2
          WHERE id = $1`,
          [rating.id, user_rating]
      )
    } else {
      const id = uuid.v4();
      if (user_rating === 1) {
        await t.none(`UPDATE posts
            SET upvotes = upvotes + 1
            WHERE id = $1`,
            post);
      } else if (user_rating === -1) {
        await t.none(`UPDATE posts
            SET downvotes = downvotes + 1
            WHERE id = $1`,
            post);
      }
      return t.none(`INSERT INTO posts_rating(id, user_id, post, rating)
          VALUES($1, $2, $3, $4)`,
          [id, user.id, post, user_rating]);
    }
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
}