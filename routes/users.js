var express = require('express');
var router = express.Router();
let user_controller = require('../controllers/userController');

/* GET users listing. */
router.post('/register', user_controller.create_account);

router.post('/signin', user_controller.sign_in);

router.post('/subscribe_to_subzeddit', user_controller.subscribe_to_subzeddit);

router.get('/:id/subscriptions', user_controller.get_user_subscriptions);


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
