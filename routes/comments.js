const express = require("express");
const router = express.Router();
const comment_controller = require("../controllers/commentController");
const post_controller = require("../controllers/postController");

router.post("/", post_controller.post_comment);

router.post("/rate", comment_controller.rate_comment);

router.put("/", comment_controller.edit_comment);

router.delete("/", comment_controller.delete_comment);