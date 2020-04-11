const express = require('express');
const router = express.Router();

const subzeddit_controller = require('../controllers/subzedditController');
const post_controller = require('../controllers/postController');

router.post('/create', subzeddit_controller.subzeddit_create);

router.get('/index', subzeddit_controller.subzeddit_all);

router.get('/subzeddit/:subzeddit/:post', post_controller.post_detail);

router.get('/subzeddit/:subzeddit', subzeddit_controller.get_subzeddit);

router.post('/post/create', post_controller.post_create);

module.exports = router;