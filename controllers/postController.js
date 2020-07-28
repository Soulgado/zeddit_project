const db = require("../db");
const uuid = require("uuid");
const fs = require("fs");
const { body, query, param, validationResult } = require("express-validator");

const POST_TYPES = {
  image: "image",
  text: "text",
};

exports.post_create = [
  body("user").notEmpty(), // add validation for user
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title field should not be empty"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content field should not be empty"),
  body("subzeddit")
    .trim()
    .notEmpty()
    .withMessage("Subzeddit field should not be empty")
    .isAscii(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    const id = uuid.v4();
    db.tx("insert-post", async (t) => {
      const subzeddit = await t.oneOrNone(
        "SELECT id FROM subzeddits WHERE title = $1",
        [req.body.subzeddit]
      );
      return t.one(
        `INSERT INTO posts(id, title, creator, content, creation_date, subzeddit, type)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, title, creator, content, creation_date, subzeddit`,
        [
          id,
          req.body.title,
          req.body.user,
          req.body.content,
          new Date(),
          subzeddit ? subzeddit.id : 0,
          POST_TYPES.text,
        ]
      );
    })
      .then((data) => {
        data.subzeddit = req.body.subzeddit;
        res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        let msg = "";
        switch (error.constraint) {
          case "Parent subzeddit":
            msg = "There is no subzeddit with such title";
            break;
          case "User creator":
            msg = "There is no user with such id";
            break;
          default:
            msg = "Unknown error";
        }
        res.status(400).json({
          error: "error",
          errors: msg,
        });
        console.log(error);
      });
  },
];

exports.post_create_image = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title field should not be empty"),
  body("user")
    .trim()
    .notEmpty().withMessage("User field should not be empty"),
  body("subzeddit")
    .trim()
    .notEmpty()
    .withMessage("Subzeddit field should not be empty")
    .isAscii(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    const filename = req.file.filename;
    // save post in database with filename
    const id = uuid.v4();
    db.tx("insert-image-post", async (t) => {
      const subzeddit = await t.oneOrNone(
        "SELECT id FROM subzeddits WHERE title = $1",
        [req.body.subzeddit]
      );
      return t.one(
        `INSERT INTO posts(id, title, creator, filename, creation_date, subzeddit, type)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, title, creator, creation_date, subzeddit`,
        [
          id,
          req.body.title,
          req.body.user,
          filename,
          new Date(),
          subzeddit ? subzeddit.id : 0,
          POST_TYPES.image,
        ]
      );
    })
      .then((data) => {
        data.subzeddit = req.body.subzeddit;
        res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        msg = "";
        // only checks for database errors, add check for general errors
        switch (error.constraint) {
          case "Parent subzeddit":
            msg = "There is no subzeddit with such title";
            break;
          case "User creator":
            msg = "There is no user with such id";
            break;
          default:
            msg = "Unknown error";
        }
        console.log(error);
        res.status(400).json({
          error: "error",
          errors: msg,
        });
      });
  },
];

exports.post_detail = [
  query("user").trim().optional().isUUID(),
  param("post").trim().notEmpty().isUUID(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    let user;
    if (!req.query.user) {
      user = "00000000-0000-0000-0000-000000000000";  // placeholder non-existent user for database query
    } else {
      user = req.query.user;
    }
    // get single post and its comments based on post's id
    db.task(async (t) => {
      const post = await t.one(
        `SELECT 
      post.*,
      creator.username,
      subzeddit.title subzeddit_title,
      user_rating.rating
    FROM posts post 
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
    WHERE post.id = $2`,
        [user, req.params.post]
      );
      const comments = await t.any(
        `SELECT 
        comment.*,
        author.username,
        rating.rating
      FROM comments comment
      LEFT JOIN users author ON comment.author = author.id
      LEFT JOIN comments_rating rating ON rating.comment = comment.id AND rating.user_id = $1
      WHERE parent_post = $2 ORDER BY level`,
        [user, req.params.post]
      );
      let commentListObject = {}; // mapping??
      // create object with comment objects with id as key
      comments.forEach((comment) => {
        comment.child_comments = [];
        commentListObject[comment.id] = comment;
      });
      // for each comment having parent, put it into children of the parent
      Object.values(commentListObject).forEach((comment) => {
        if (comment.parent_comment) {
          commentListObject[comment.parent_comment].child_comments.push(
            comment
          );
        }
      });
      let resultList = [];
      // put all top-level comments into list
      Object.values(commentListObject).forEach((comment) => {
        if (comment.level === 1) {
          resultList.push(comment);
        }
      });
      // O^3 complexity, better algorithm??
      post.comments = resultList;
      return post;
    })
      .then((post) => {
        res.json({
          result: "success",
          data: post,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ result: "error" });
      });
  },
];

exports.post_comment = [
  body("user").trim().notEmpty(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content field should not be empty"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    const parent = req.body.parent_comment ? req.body.parent_comment : null;
    // first get post object =>
    // create and add comment to the post
    db.tx("insert-comment", async (t) => {
      await t.none(
        "UPDATE posts SET comments_num = comments_num + 1 WHERE id = $1",
        req.body.post
      );
      const post = await t.one(
        "SELECT id FROM posts WHERE id = $1",
        req.body.post
      );
      let level = 1;
      if (parent) {
        const parent_comment_level = await t.one(
          "SELECT level FROM comments WHERE id = $1",
          parent
        );
        level = parent_comment_level.level + 1;
      }
      const id = uuid.v4();
      return t.one(
        `INSERT INTO 
        comments(id, author, content, creation_time, parent_post, parent_comment, level)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, author, content, creation_time, parent_post, parent_comment, level`,
        [id, req.body.user, req.body.content, new Date(), post.id, parent, level]
      );
    })
      .then((comment) => {
        res.json({
          result: "success",
          data: comment,
        });
      })
      .catch((error) => {
        msg = "";
        switch (error.constraint) {
          case "Comment author":
            msg = "There is no user with such id";
            break;
          case "Parent comment":
            msg = "There is no comment with such id";
            break;
          case "Parent post":
            msg = "There is no post with such id";
            break;
          default:
            msg = "Unknown error";
        }
        console.log(error);
        res.json({
          result: "error",
          errors: msg,
        });
      });
  },
];

exports.rate_post = [
  body("user").trim().notEmpty(),
  body("user_rating").trim().notEmpty().isInt().toInt(),
  body("post").trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    const { user, user_rating, post } = req.body;
    db.tx("rate-post", async (t) => {
      // get existing entry on post rating from user
      // update or create based on result
      const rating = await t.oneOrNone(
        "SELECT * FROM posts_rating WHERE user_id = $1 AND post = $2",
        [user, post]
      );
      if (rating) {
        if (user_rating === rating.rating) {
          // if user_rating is the same as the database rating
          // delete database entry
          if (user_rating === 1) {
            await t.none(`UPDATE posts SET upvotes = upvotes - 1 WHERE id = $1`, post);
          } else {
            await t.none(`UPDATE posts SET downvotes = downvotes - 1 WHERE id = $1`, post);
          }
          return t.none(`DELETE FROM posts_rating WHERE id = $1`, rating.id);
        } else {
          // if user_rating is different from rating in database entry
          // change existing entry
          await t.none(
            `UPDATE posts 
          SET upvotes = upvotes + $1,
              downvotes = downvotes - $1
          WHERE id = $2`,
            [user_rating, post]
          );
          return t.none(
            `UPDATE posts_rating
            SET rating = $2
            WHERE id = $1`,
            [rating.id, user_rating]
          );
        }
      } else {
        // if database entry was not found
        // create new posts_rating entry
        const id = uuid.v4();
        if (user_rating === 1) {
          await t.none(
            `UPDATE posts
            SET upvotes = upvotes + 1
            WHERE id = $1`,
            post
          );
        } else if (user_rating === -1) {
          await t.none(
            `UPDATE posts
            SET downvotes = downvotes + 1
            WHERE id = $1`,
            post
          );
        }
        return t.none(
          `INSERT INTO posts_rating(id, user_id, post, rating)
          VALUES($1, $2, $3, $4)`,
          [id, user, post, user_rating]
        );
      }
    })
      .then(() => {
        res.json({
          result: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
        });
      });
  },
];

exports.get_most_popular_default = (req, res) => {
  db.any(
  `SELECT 
  post.*,
  creator.username,
  subzeddit.title subzeddit_title
  FROM posts post 
  LEFT JOIN users creator ON post.creator = creator.id
  LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
  ORDER BY upvotes DESC, creation_date DESC
  LIMIT 10`)
  .then(data => {
    res.json({
      result: "success",
      data: data ? data : []  // if no posts exists return empty array
    });
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
      result: "error"
    });
  });
}

exports.get_most_popular_user = [
  query("user").trim().notEmpty().isUUID(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    db.any(
    `SELECT 
    post.*,
    creator.username,
    subzeddit.title subzeddit_title,
    user_rating.rating
    FROM posts post 
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
    ORDER BY upvotes DESC LIMIT 10`,
    req.query.user)
      .then((data) => {
        res.json({
          result: "success",
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
        });
      });
  },
];

exports.edit_post = [
  body("user").trim().notEmpty(),
  body("post").trim().notEmpty().isInt(),
  body("title").trim().notEmpty(), // length ?
  body("content").trim(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    db.tx("get user and post", async (t) => {
      const post = await t.one(
        `SELECT posts.creator, posts.type FROM posts WHERE id = $1`,
        req.body.post
      );
      if (post.creator !== req.body.user) {
        return "Wrong user"; // template, implement error
      }
      if (post.type === "text" && req.body.type === "text") {
        return t.one(
          `UPDATE posts
          SET 
            title = $1,
            content = $2,
            update_time = CURRENT_TIMESTAMP,
            updated = true
          WHERE id = $3
          RETURNING *`,
          [req.body.title, req.body.content, req.body.post]
        );
      } else if (post.type === "image" && req.body.type === "image") {
        return t.one(
          `UPDATE posts
          SET
            title = $1,
            update_time = CURRENT_TIMESTAMP,
            updated = true
          WHERE id = $2
          RETURNING *`,
          [req.body.title, req.body.post]
        );
      } else {
        return "Wrong post type";
      }
    })
      .then((data) => {
        if (data === "Wrong user" || data === "Wrong post type") {
          console.log(data);
          res.status(400).json({
            result: "error",
          });
        } else {
          res.json({
            result: "success",
            data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
        });
      });
  },
];

exports.delete_post = [
  body("user").trim().notEmpty(),
  body("post").trim().notEmpty().isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    db.tx("check user and delete post", async (t) => {
      const post = await t.one(
        `SELECT creator, filename FROM posts WHERE id = $1`,
        req.body.post
      );
      if (post.creator !== req.body.user) {
        return "Wrong user";
      }
      fs.unlink(`../public/images/${post.filename}`, (err) => {
        if (err) return;
      });
      return t.one(`DELETE FROM posts WHERE id=$1`, req.body.post);
    })
      .then((data) => {
        if (data === "Wrong user") {
          res.status(400).json({
            result: "error",
            errors: "Wrong user",
          });
        } else {
          res.json({
            result: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error,
        });
      });
  },
];
