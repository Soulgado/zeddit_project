var express = require("express");
var router = express.Router();
let user_controller = require("../controllers/userController");

router.post("/register", user_controller.create_account);

router.post("/signin", user_controller.sign_in);

router.post("/subscribe_to_subzeddit", user_controller.subscribe_to_subzeddit);

router.post(
  "/unsub_from_subzeddit",
  user_controller.unsubscribe_from_subzeddit
);

router.get("/:id/subscriptions", user_controller.get_user_subscriptions);

router.get("/:id/upvoted", user_controller.get_upvoted_posts);

router.get("/:id/downvoted", user_controller.get_downvoted_posts);

router.get("/:user/created_posts", user_controller.get_created_posts);

router.put("/update_username", user_controller.edit_name);

router.put("/update_password", user_controller.edit_password);

router.put("/update_email", user_controller.edit_email);

router.delete("/delete_user", user_controller.delete_account);

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
