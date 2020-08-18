const db = require("../db");
const uuid = require("uuid");
const { body, validationResult } = require("express-validator");

exports.rate_comment = [
  body("user").trim().notEmpty(),
  body("user_rating").trim().notEmpty().isInt().toInt(), 
  body("comment").trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    const { user, user_rating, comment } = req.body;
    db.tx("rate-comment", async (t) => {
      // get existing entry on post rating from user
      // update or create based on result
      const rating = await t.oneOrNone(
        "SELECT * FROM comments_rating WHERE user_id = $1 AND comment = $2",
        [user, comment]
      );
      if (rating) {
        if (user_rating === rating.rating) {
          // delete database entry if ratings are equal
          if (user_rating === 1) {
            await t.none(`UPDATE comments SET upvotes = upvotes - 1 WHERE id = $1`, comment);
          } else {
            await t.none(`UPDATE comments SET downvotes = downvotes - 1 WHERE id = $1`, comment);
          }
          return t.none(`DELETE FROM comments_rating WHERE id = $1`, rating.id);
        } else {
        // if user_rating is different from rating in database entry
        // change existing entry
          await t.none(
            `UPDATE comments 
          SET upvotes = upvotes + $1,
              downvotes = downvotes - $1
          WHERE id = $2`,
            [user_rating, comment]
          );
        }
        return t.none(
          `UPDATE comments_rating
          SET rating = $2
          WHERE id = $1`,
          [rating.id, user_rating]
        );
      } else {
        // if there is no entry in the database
        // create new entry
        const id = uuid.v4();
        if (user_rating === 1) {
          await t.none(
            `UPDATE comments
            SET upvotes = upvotes + 1
            WHERE id = $1`,
            comment
          );
        } else if (user_rating === -1) {
          await t.none(
            `UPDATE comments
            SET downvotes = downvotes + 1
            WHERE id = $1`,
            comment
          );
        }
        return t.none(
          `INSERT INTO comments_rating(id, user_id, comment, rating)
          VALUES($1, $2, $3, $4)`,
          [id, user, comment, user_rating]
        );
      }
    })
      .then(() => {
        return res.json({
          result: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          result: "error",
        });
      });
  },
];

exports.edit_comment = [
  body("user").trim().notEmpty(),
  body("comment").trim().notEmpty(),
  body("content").trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    db.tx("edit comment", async (t) => {
      const comment = await t.one(
        "SELECT author FROM comments WHERE id = $1",
        req.body.comment
      );
      if (comment.author !== req.body.user) {
        return "Wrong user";
      }
      return t.one(
        `UPDATE comments
        SET 
          content = $1,
          updated = true
        WHERE id = $2
        RETURNING *`,
        [req.body.content, req.body.comment]
      );
    })
      .then((data) => {
        if (data === "Wrong user") {
          return res.status(400).json({
            result: "error",
            errors: "Wrong user",
          });
        } else {
          return res.json({
            result: "success",
            data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          result: "error",
          errors: error,
        });
      });
  },
];

exports.delete_comment = [
  body("user").trim().notEmpty(),
  body("comment").trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    db.tx("delete comment", async (t) => {
      const comment = await t.one(
        "SELECT author FROM comments WHERE id = $1",
        req.body.comment
      );
      if (comment.author !== req.body.user) {
        return "Wrong user";
      }
      return t.one(
        `UPDATE comments
        SET 
          content = '[deleted]',
          deleted = true
        WHERE id = $1
        RETURNING *`,
        req.body.comment
      );
    })
      .then((data) => {
        if (data === "Wrong user") {
          return res.status(400).json({
            result: "error",
            errors: "Wrong user",
          });
        } else {
          return res.json({
            result: "success",
            data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          result: "error",
          errors: error,
        });
      });
  },
];
