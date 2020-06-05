const db = require("../db");
const { body, param, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.create_account = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field should not be empty")
    .isAscii()
    .isLength({ min: 3 })
    .withMessage("Username is too short")
    .isLength({ max: 60 })
    .withMessage("Username is too long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field should not be empty")
    .isLength({ min: 5 })
    .withMessage("Password is too short")
    .isLength({ max: 60 })
    .withMessage("Password is too long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail field should not be empty")
    .isEmail()
    .withMessage("E-mail field should contain valid email address")
    .normalizeEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    // check for existing username
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      db.none(
        "INSERT INTO users(username, password, email) VALUES($1, $2, $3)",
        [req.body.username, hash, req.body.email]
      )
        .then(() => {
          res.json({ result: "success" });
        })
        .catch((error) => {
          let msg = "";
          switch (error.constraint) {
            case "Unique username":
              msg = "This username already taken";
              break;
            default:
              msg =
                "Unknown errors happened, please fill the form fields again";
          }
          res.status(400).json({
            result: "error",
            errors: msg,
          });
          console.log(error);
        });
    });
  },
];

exports.sign_in = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty")
    .isAscii(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty")
    .isLength({ min: 5, max: 60 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    db.oneOrNone(`SELECT * FROM users WHERE username=$1`, req.body.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result) {
              user.password = req.body.password;
              res.json({ result: "success", user });
            } else {
              res.status(400).json({
                result: "error",
                errors: "Wrong username or password",
              });
            }
          });
        } else {
          // if user has not been found
          return res.status(400).json({
            result: "error",
            errors: "Wrong username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error.message,
        });
      });
  },
];

exports.subscribe_to_subzeddit = [
  body("subzeddit").trim().isAscii(),
  // only send user id

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    // get subzeddit, subscribe (ToDo: add checking user later)
    // add check for subzeddit
    db.tx("create_subscription", async (t) => {
      await t.none(
        "UPDATE subzeddits SET subscriptions = subscriptions + 1 WHERE title = $1",
        req.body.subzeddit
      );
      const subzeddit = await t.one(
        "SELECT id FROM subzeddits WHERE title = $1",
        [req.body.subzeddit]
      );
      return t.one(
        `INSERT INTO subzeddit_subscriptions(subscriber, subzeddit)
          VALUES ($1, $2)
          RETURNING id, subscriber, subzeddit`,
        [req.body.user.id, subzeddit.id]
      );
    })
      .then((data) => {
        res.json({
          result: "success",
          data: data,
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

exports.unsubscribe_from_subzeddit = [
  body("subzeddit").trim().isAscii(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
    }
    // ToDo: check for existing subscription
    db.tx("delete_subscription", async (t) => {
      await t.none(
        "UPDATE subzeddits SET subscriptions = subscriptions - 1 WHERE title = $1",
        req.body.subzeddit
      );
      const subzeddit = await t.one(
        "SELECT id FROM subzeddits WHERE title = $1",
        [req.body.subzeddit]
      );
      return t.none(
        `DELETE FROM subzeddit_subscriptions
          WHERE subscriber = $1 AND subzeddit = $2`,
        [req.body.user.id, subzeddit.id]
      );
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

exports.get_user_subscriptions = [
  param("id").trim().isInt(), // change after id type

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array(),
      });
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
    WHERE sub.subscriber = $1`,
      req.params.id
    )
      .then((data) => {
        res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          result: "error",
        });
      });
  },
];

exports.get_upvoted_posts = [
  param("id").trim().notEmpty().isInt(),
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
      rated.rating,
      creator.username,
      subzeddit.title subzeddit_title
    FROM posts_rating rated
    LEFT JOIN posts post ON rated.post = post.id
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    WHERE rated.user_id = $1 AND rated.rating = 1`,
      req.params.id
    )
      .then((data) => {
        res.json({
          result: "success",
          data: data,
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
// unite these two controllers??

exports.get_downvoted_posts = [
  param("id").trim().notEmpty().isInt(),
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
      rated.rating,
      creator.username,
      subzeddit.title subzeddit_title
    FROM posts_rating rated
    LEFT JOIN posts post ON rated.post = post.id
    LEFT JOIN users creator ON post.creator = creator.id
    LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
    WHERE rated.user_id = $1 AND rated.rating = -1`,
      req.params.id
    )
      .then((data) => {
        res.json({
          result: "success",
          data: data,
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

exports.get_created_posts = [
  param("user").trim().notEmpty(),
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
        user_rating.rating,
        creator.username,
        subzeddit.title subzeddit_title
      FROM posts post
      LEFT JOIN users creator ON post.creator = creator.id
      LEFT JOIN subzeddits subzeddit ON post.subzeddit = subzeddit.id
      LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
      WHERE post.creator = $1
      `,
      req.params.user
    )
      .then((data) => {
        res.json({
          result: "success",
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          result: "error",
          errors: error,
        });
      });
  },
];

// factorize this abomination
exports.edit_name = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty")
    .isAscii(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty")
    .isLength({ min: 5, max: 60 }),
  body("new_username")
    .trim()
    .notEmpty()
    .withMessage("New username field must not be empty"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    db.oneOrNone(`SELECT * FROM users WHERE username=$1`, req.body.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result) {
              db.oneOrNone(
                `UPDATE users
              SET username = $1
              WHERE username = $2`,
                [req.body.new_username, req.body.username]
              )
                .then((user) => {
                  res.json({
                    result: "success",
                    user,
                  });
                })
                .catch((error) => {
                  let msg = "";
                  switch (error.constraint) {
                    case "Unique username":
                      msg = "This username already taken";
                      break;
                    default:
                      msg =
                        "Unknown errors happened, please fill the form fields again";
                  }
                  res.status(400).json({
                    result: "error",
                    errors: msg,
                  });
                  console.log(error);
                });
            } else {
              res.status(400).json({
                result: "error",
                errors: "Wrong username or password",
              });
            }
          });
        } else {
          // if user has not been found
          return res.status(400).json({
            result: "error",
            errors: "Wrong username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error.message,
        });
      });
  },
];

exports.edit_password = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty")
    .isAscii(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty")
    .isLength({ min: 5, max: 60 }),
  body("new_password")
    .trim()
    .notEmpty()
    .withMessage("New password field must not be empty"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    db.oneOrNone(`SELECT * FROM users WHERE username=$1`, req.body.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result) {
              bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                db.oneOrNone(
                  `UPDATE users
                SET password = $1
                WHERE username = $2`,
                  [hash, req.body.username]
                )
                  .then((user) => {
                    res.json({
                      result: "success",
                      user,
                    });
                  })
                  .catch((error) => {
                    msg =
                      "Unknown errors happened, please fill the form fields again";
                    res.status(400).json({
                      result: "error",
                      errors: msg,
                    });
                    console.log(error);
                  });
              });
            } else {
              res.status(400).json({
                result: "error",
                errors: "Wrong username or password",
              });
            }
          });
        } else {
          // if user has not been found
          return res.status(400).json({
            result: "error",
            errors: "Wrong username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error.message,
        });
      });
  },
];

exports.delete_account = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty")
    .isAscii(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty")
    .isLength({ min: 5, max: 60 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    db.oneOrNone(`SELECT * FROM users WHERE username=$1`, req.body.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result) {
              db.none(
                `DELETE * FROM users WHERE username = $1`,
                req.body.username
              )
                .then(() => {
                  res.json({
                    result: "success",
                  });
                })
                .catch((error) => {
                  msg =
                    "Unknown errors happened, please fill the form fields again";
                  res.status(400).json({
                    result: "error",
                    errors: msg,
                  });
                  console.log(error);
                });
            } else {
              res.status(400).json({
                result: "error",
                errors: "Wrong username or password",
              });
            }
          });
        } else {
          // if user has not been found
          return res.status(400).json({
            result: "error",
            errors: "Wrong username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error.message,
        });
      });
  },
];

exports.edit_name = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty")
    .isAscii(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty")
    .isLength({ min: 5, max: 60 }),
  body("new_email")
    .trim()
    .notEmpty()
    .withMessage("New email field must not be empty")
    .isEmail()
    .withMessage("Email field should contain valid email")
    .normalizeEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    db.oneOrNone(`SELECT * FROM users WHERE username=$1`, req.body.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, function (
            err,
            result
          ) {
            if (result) {
              db.oneOrNone(
                `UPDATE users
              SET email = $1
              WHERE username = $2`,
                [req.body.new_email, req.body.username]
              )
                .then((user) => {
                  res.json({
                    result: "success",
                    user,
                  });
                })
                .catch((error) => {
                  let msg =
                    "Unknown errors happened, please fill the form fields again";
                  res.status(400).json({
                    result: "error",
                    errors: msg,
                  });
                  console.log(error);
                });
            } else {
              res.status(400).json({
                result: "error",
                errors: "Wrong username or password",
              });
            }
          });
        } else {
          // if user has not been found
          return res.status(400).json({
            result: "error",
            errors: "Wrong username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          result: "error",
          errors: error.message,
        });
      });
  },
];
