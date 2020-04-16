const express = require('express');
const router = express.Router();

const subzeddit_controller = require('../controllers/subzedditController');
const post_controller = require('../controllers/postController');

router.post('/create', subzeddit_controller.subzeddit_create);

router.get('/index', subzeddit_controller.subzeddit_all);

router.get('/posts/:post', post_controller.post_detail);

router.get('/subzeddit/:title', subzeddit_controller.get_subzeddit);

router.post('/post/create', post_controller.post_create);

router.post('/post/rate', post_controller.rate_post);

router.post('/comment/create', post_controller.post_comment);

router.post('/post/rate_post', post_controller.rate_post);

module.exports = router;