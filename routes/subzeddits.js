const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const subzeddit_controller = require("../controllers/subzedditController");

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

router.post("/", subzeddit_controller.subzeddit_create);

router.get("/list?", subzeddit_controller.subzeddit_all);

router.get(
  "/get_titles",
  subzeddit_controller.get_subzeddits_titles
);

router.get("/subscribe_status?", subzeddit_controller.get_subscription_info);

router.get("/:title?", subzeddit_controller.get_subzeddit);

module.exports = router;
