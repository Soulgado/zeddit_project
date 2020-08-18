const db = require("../db");
const uuid = require("uuid");
const { body, query, param, validationResult } = require("express-validator");

exports.subzeddit_create = [
  body("user").notEmpty().withMessage("User should be specified"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title field should not be empty"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description field should not be empty"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    // first get User and then create subzeddit
    // check for user auth
    const id = uuid.v4();
    db.one(
      "INSERT INTO subzeddits(id, title, creator, creation_date, description) VALUES($1, $2, $3, $4, $5) RETURNING id, title, creator, creation_date",
      [id, req.body.title, req.body.user, new Date(), req.body.description]
    )
      .then((subzeddit) => {
        return res.json({
          result: "success",
          data: subzeddit,
        });
      })
      .catch((error) => {
        let msg = "";
        switch (error.constraint) {
          case "Unique title":
            msg = "Subzeddit with this title already exists";
            break;
          case "User creator":
            msg = "There is no user with such id";
            break;
          default:
            msg = "Unknown error";
        }
        console.log(error);
        return res.status(400).json({
          result: "error",
          errors: msg,
        });
      });
  },
];

exports.subzeddit_all = [
  query("user").trim(),
  (req, res) => {
    // get all subzeddits
    // also fetch subscription status
    db.tx("get all subzeddits", async t => {
      if (req.query.user) {
        return t.any(
          `SELECT
            subzeddit.*,
            subscription.id subscription_status,
            creator.username
          FROM subzeddits subzeddit
          LEFT JOIN users creator ON subzeddit.creator = creator.id
          LEFT JOIN subzeddit_subscriptions subscription ON subscription.subzeddit = subzeddit.id AND subscription.subscriber = $1
          ORDER BY title ASC`,
          req.query.user)
      } else {
        return t.any(
          `SELECT
            subzeddit.*,
            creator.username
          FROM subzeddits subzeddit
          LEFT JOIN users creator ON subzeddit.creator = creator.id
          ORDER BY title ASC`)
      }
    })
      .then((data) => {
        return res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          result: "error",
        });
      });
  },
];

exports.get_subzeddit = [
  param("title").trim().notEmpty(),
  query("user").trim(),
  (req, res) => {
    let user;
    if (req.query.user) {
      user = req.query.user;
    } else {
      user = "00000000-0000-0000-0000-000000000000";
    }
    db.task(async (t) => {
      const subzeddit = await t.one(
        `SELECT 
        subzeddit.*,
        subscription.id subscription_status
        FROM subzeddits subzeddit
        LEFT JOIN subzeddit_subscriptions subscription ON subscription.subzeddit = subzeddit.id AND subscription.subscriber = $1
        WHERE title = $2`,
        [user, req.params.title]
      );
      return subzeddit;
    })
      .then((data) => {
        return res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          result: "error",
        });
      });
  },
];

// store query parameters corresponding to database commands
const SORT_DICT = {   
  "new": "creation_date",
  "top": "upvotes",
  "controversial": "downvotes",
  "best": "upvotes - downvotes"
}

exports.get_subzeddit_posts = [
  param("title").trim().notEmpty(),
  query("user").trim(),
  query("page").trim().toInt(),
  query("sort").trim().isIn(["new", "top", "controversial", "best"]),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: "error",
        errors: errors.array()[0].msg,
      });
    }
    let user;
    if (req.query.user) {
      user = req.query.user;
    } else {
      user = "00000000-0000-0000-0000-000000000000";  // placeholder value for anonymous user
    }
    db.task(async (t) => {
      const subzeddit = await t.one(
        `SELECT id
        FROM subzeddits
        WHERE title = $1`,
        req.params.title
      );
      const posts = await t.any(
        `SELECT 
        post.*,
        user_rating.rating,
        creator.username
      FROM posts post 
      LEFT JOIN users creator ON post.creator = creator.id
      LEFT JOIN posts_rating user_rating ON user_rating.post = post.id AND user_rating.user_id = $1
      WHERE subzeddit = $2 ORDER BY ${SORT_DICT[req.query.sort]} DESC
      LIMIT 10 OFFSET $3`,
        [user, subzeddit.id, req.query.page * 10]
      );
      return posts;
    })
      .then((data) => {
        data.forEach(post => post.subzeddit_title = req.params.title);
        return res.json({
          result: "success",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          result: "error",
        });
      });
  },
];

exports.get_subscription_info = function (req, res) {
  // check if user is subscribed to subzeddit
  const { user, subzeddit } = req.query;
  db.task(async (t) => {
    const user_id = await t.oneOrNone(
      "SELECT id FROM users WHERE username = $1",
      user
    );
    const subzeddit_id = await t.oneOrNone(
      "SELECT id FROM subzeddits WHERE title = $1",
      subzeddit
    );
    if (!user_id || !subzeddit_id) return null;
    return t.oneOrNone(
      `SELECT id FROM subzeddit_subscriptions 
      WHERE subscriber = $1 AND subzeddit = $2`,
      [user_id.id, subzeddit_id.id]
    );
  })
    .then((data) => {
      if (!data) {
        return res.json({
          result: "success",
          data: {
            subzeddit,
            status: false,
          },
        });
      } else {
        return res.json({
          result: "success",
          data: {
            subzeddit,
            status: true,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        result: "error",
      });
    });
};

exports.get_subzeddits_titles = function (req, res) {
  db.any(
    `SELECT title
    FROM subzeddits`
  )
    .then((data) => {
      return res.json({
        result: "success",
        data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        result: "error",
      });
    });
};
