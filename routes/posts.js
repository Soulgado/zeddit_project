const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const subzeddit_controller = require("../controllers/subzedditController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

function generateFilename() {
  // generate random filename
  const raw = crypto.randomBytes(16);
  return raw.toString("hex");
}

// storage options for images, see multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.match(/\.(png|jpeg|jpg|)$/);
    const generatedName = generateFilename();
    cb(null, `${generatedName}${fileExt[0]}`);
  },
});

const upload = multer({ storage: storage });

router.post("/create_text", post_controller.post_create);

router.post(
  "create_img",
  upload.single("file"),
  post_controller.post_create_image
);

router.get("/:post?", post_controller.post_detail);

router.get("/most_popular_user?", post_controller.get_most_popular_user);

router.get("/most_popular_default", post_controller.get_most_popular_default);

router.post("/rate", post_controller.rate_post);

router.put("/", post_controller.edit_post);

router.delete("/", post_controller.delete_post);