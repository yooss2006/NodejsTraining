var express = require("express");
var router = express.Router();
const loginCheck = require("../module/loginCheck");
const upload = require("../module/imageUpload");

router.get("/", loginCheck, (req, res) => {
  res.status(200).json({
    message: "login success!!",
  });
});

//데이터를 image라는 이름으로 처리했을 때 이 미들웨어에서 처리한다.
router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.status(200).json({
    message: "upload success",
  });
});

module.exports = router;
