const db = require('../db');
const uuid = require('uuid');
const { body, query, param, validationResult } = require('express-validator');

const POST_TYPES = {
  image: 'image',
  text: 'text'
}

exports.post_create = [
  body('user').notEmpty(),   // add validation for user
  body('title').trim().isAscii(),
  body('content').trim(),  
  body('subzeddit').trim().notEmpty().isAscii(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: 'error',
        errors: errors.array()
      })
    }
    // get User => create Post => add Post to Subzeddit and save it
    db.tx('insert-post', async t => {
      const subzeddit = await t.one('SELECT id FROM subzeddits WHERE title = $1', [req.body.subzeddit]);
      return t.one(`INSERT INTO posts(title, creator, content, creation_date, subzeddit, type)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, title, creator, content, creation_date, subzeddit`,
        [req.body.title, req.body.user.id, req.body.content, new Date(), subzeddit.id, POST_TYPES.text]);
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
];

exports.post_create_image = [
  body('title').trim().notEmpty(),
  body('user').trim().notEmpty().toInt().isInt(),  // change later according to user table
  body('subzeddit').trim().notEmpty().isAscii(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    const filename = req.file.filename;
    // save post in database with filename
    db.tx('insert-image-post', async t => {
      const subzeddit = await t.one('SELECT id FROM subzeddits WHERE title = $1', [req.body.subzeddit]);
      return t.one(`INSERT INTO posts(title, creator, filename, creation_date, subzeddit, type)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, title, creator, filename, creation_date, subzeddit`,
        [req.body.title, Number(req.body.user), filename, new Date(), subzeddit.id, POST_TYPES.image]);
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
]

exports.post_detail = [
  query('user').trim().notEmpty().toInt().isInt(),
  param('post').trim().notEmpty().isInt(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    // get single post and its comments based on post's id
    db.task(async t => {
      const post = await t.one(
        `SELECT 
      post.id,
      post.title,
      post.creator,
      post.content,
      post.creation_date,
      post.filename,
      post.upvotes,
      post.downvotes,
      post.type,
      post.updated,
      post.comments comments_num,
      creator.username,
      subzeddit.title subzeddit_title,
      user_rating.rating
    FROM posts post 
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
    WHERE post.id = $2`, [req.query.user, req.params.post]);
      const comments = await t.any(
        `SELECT 
        comment.id,
        comment.author,
        comment.content,
				comment.creation_time,
				comment.parent_comment,
        comment.level,
        comment.upvotes,
        comment.downvotes,
        comment.updated,
        author.username,
        rating.rating
      FROM comments comment
      LEFT JOIN users author ON comment.author = author.id
      LEFT JOIN comments_rating rating ON rating.comment = comment.id AND rating.user_id = $1
      WHERE parent_post = $2 ORDER BY level`, [req.query.user, req.params.post]
      );
      let commentListObject = {}; // mapping??
      comments.forEach(comment => {
        comment.child_comments = [];
        commentListObject[comment.id] = comment;
      });
      Object.values(commentListObject).forEach(comment => {
        if (comment.parent_comment) {
          commentListObject[comment.parent_comment].child_comments.push(comment);
        }
      });
      let resultList = [];
      Object.values(commentListObject).forEach(comment => {
        if (comment.level === 1) {
          resultList.push(comment);
        }
      });
      // O^3 complexity, better algorithm?? 
      post.comments = resultList;
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
];

exports.post_comment = [
  body('user').trim().notEmpty(),
  body('content').trim().notEmpty(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    const parent = req.body.parent_comment ? req.body.parent_comment : null;
    // first get post object =>
    // create and add comment to the post
    db.tx('insert-comment', async t => {
      await t.none('UPDATE posts SET comments = comments + 1 WHERE id = $1', req.body.post);
      const post = await t.one('SELECT id FROM posts WHERE id = $1', req.body.post);
      const parent_comment_level = await t.one('SELECT level FROM comments WHERE id = $1', parent);
      // sent comment_level within body??
      const level = parent_comment_level ? parent_comment_level.level + 1 : 1;
      return t.one(`INSERT INTO 
        comments(author, content, creation_time, parent_post, parent_comment, level)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id, author, content, creation_time, parent_post, parent_comment, level`,
        [
          req.body.user,
          req.body.content,
          new Date(),
          post.id,
          parent,
          level
        ]);
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
];
  
exports.rate_post = [
  body('user').trim().notEmpty(),
  body('user_rating').trim().notEmpty().isInt().toInt(),
  body('post').trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    const { user, user_rating, post } = req.body;
    
    db.tx('rate-post', async t => {
      // get existing entry on post rating from user
      // update or create based on result
      const rating = await t.oneOrNone('SELECT * FROM posts_rating WHERE user_id = $1 AND post = $2', [user, post]);
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
          [id, user, post, user_rating]);
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
];

exports.get_most_popular_default = [
  query('user').trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    // check for user first => get most popular with upvotes
    db.any(
      `SELECT 
    post.id,
    post.title,
    post.content,
    post.creation_date,
    post.filename,
    post.upvotes,
    post.downvotes,
    post.type,
    post.updated,
    post.comments,
    creator.username,
    subzeddit.title subzeddit_title,
    user_rating.rating
  FROM posts post 
  LEFT JOIN users creator ON post.creator = creator.id
  LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
  LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
  ORDER BY upvotes DESC LIMIT 10`,
      req.query.user)
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
];

exports.edit_post = [
  body('user').trim().notEmpty(),
  body('post').trim().notEmpty().isInt(),
  body('title').trim().notEmpty(),   // length ?
  body('content').trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    db.tx('get user and post', async t => {
      const post = await t.one(`SELECT creator FROM posts WHERE id = $1`, req.body.post);
      if (Number(post.creator) !== req.body.user.id) {
        return "Wrong user"; // template, implement error
      }
      // change creation_date to current time
      // add column for is_updated - boolean and set to true
      return t.one(
        `UPDATE posts
        SET 
          title = $1,
          content = $2,
          creation_date = CURRENT_TIMESTAMP,
          updated = true
        WHERE id = $3
        RETURNING *`,
        [req.body.title, req.body.content, req.body.post]
      )
    })
      .then(data => {
        if (data === 'Wrong user') {
          res.status(400).json({
            result: 'error'
          })
        } else {
          res.json({
            result: 'success',
            data
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
];

exports.delete_post = [
  body('user').trim().notEmpty(),
  body('post').trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          result: 'error',
          errors: errors.array()
        })
      }
    db.tx('check user and delete post', async t => {
      const post = await t.one(`SELECT creator FROM posts WHERE id = $1`, req.body.post);
      if (post.creator !== req.body.user) {
        return 'Wrong user';
      }
      return t.one(
        `UPDATE posts
        SET title = '[deleted]',
        content = '[deleted]',
        filename = null,
        type = 'text'
        WHERE id = $1
        RETURNING *
        `, req.body.post
      )
    })
    .then(data => {
      if (data === 'Wrong user') {
        res.status(400).json({
          result: 'error',
          errors: 'Wrong user'
        })
      } else {
        res.json({
          result: 'success',
          data
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        result: 'error',
        errors: error
      })
    })
  }
]