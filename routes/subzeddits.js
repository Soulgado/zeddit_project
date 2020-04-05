const express = require('express');
const router = express.Router();

const subzeddit_controller = require('../controllers/subzedditController');

router.post('/create', subzeddit_controller.subzeddit_create);

router.get('/index', subzeddit_controller.subzeddit_all);

router.get('/subzeddit/:subzeddit', subzeddit_controller.get_subzeddit);

module.exports = router;