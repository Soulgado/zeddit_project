const express = require('express');
const router = express.Router();

const subzeddit_controller = require('../controllers/subzedditController');

router.post('/create', subzeddit_controller.subzeddit_create);

router.get('/index', subzeddit_controller.subzeddit_all);

module.exports = router;