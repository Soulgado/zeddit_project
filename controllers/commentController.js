const db = require('../db');
const uuid = require('uuid');

exports.rate_comment = function(req, res) {
  // add validation
  const { user, user_rating, comment } = req.body;
  db.tx('rate-comment', async t => {
    // get existing entry on post rating from user
    // update or create based on result
    const rating = await t.oneOrNone('SELECT * FROM comments_rating WHERE user_id = $1 AND comment = $2', [user.id, comment]);
    if (rating) {
      if (user_rating === rating.rating) return;
      else {
      await t.none(`UPDATE comments 
          SET upvotes = upvotes + $1,
              downvotes = downvotes - $1
          WHERE id = $2`,
          [user_rating, comment])
      }
      return t.none(`UPDATE comments_rating
          SET rating = $2
          WHERE id = $1`,
          [rating.id, user_rating]
      )
    } else {
      const id = uuid.v4();
      if (user_rating === 1) {
        await t.none(`UPDATE comments
            SET upvotes = upvotes + 1
            WHERE id = $1`,
            comment);
      } else if (user_rating === -1) {
        await t.none(`UPDATE comments
            SET downvotes = downvotes + 1
            WHERE id = $1`,
            comment);
      }
      return t.none(`INSERT INTO comments_rating(id, user_id, comment, rating)
          VALUES($1, $2, $3, $4)`,
          [id, user.id, comment, user_rating]);
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