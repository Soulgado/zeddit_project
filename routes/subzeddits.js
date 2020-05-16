const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const subzeddit_controller = require('../controllers/subzedditController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

function generateFilename () {
  // generate random filename
  const raw = crypto.randomBytes(16);
  return raw.toString('hex');
}

// storage options for images, see multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.match(/\.(png|jpeg|jpg|)$/);
    const generatedName = generateFilename();
    cb(null, `${generatedName}${fileExt[0]}`);
  }
});

const upload = multer({ storage: storage });

router.post('/create', subzeddit_controller.subzeddit_create);

router.get('/subzeddits_list?', subzeddit_controller.subzeddit_all);

router.get('/most_popular_default?', post_controller.get_most_popular_default);

router.get('/posts/:post?', post_controller.post_detail);

router.get('/subzeddit/:title?', subzeddit_controller.get_subzeddit);

router.get('/get_subzeddits_titles', subzeddit_controller.get_subzeddits_titles);

router.post('/post/create', post_controller.post_create);

router.post('/post/create_img', upload.single('file'), post_controller.post_create_image);

router.post('/post/rate', post_controller.rate_post);

router.post('/comment/create', post_controller.post_comment);

router.post('/comment/rate_comment', comment_controller.rate_comment);

router.post('/comment/edit_comment', comment_controller.edit_comment);

router.delete('/comment/delete_comment', comment_controller.delete_comment);

router.post('/edit_post', post_controller.edit_post);

router.delete('/post/delete_post', post_controller.delete_post);

router.get('/subscribe_status?', subzeddit_controller.get_subscription_info);

module.exports = router;