var express = require("express");
var router = express.Router();
//라우터만 들어가므로 따로 함수를 만들어 불러왔다.
const loginCheck = require("../module/loginCheck");

//요청이 들어오면 loginCheck 미들웨어를 먼저 실행시키며 next()가 실행되어야 아래 함수가 실행된다.
router.get("/", loginCheck, (req, res) => {
  res.status(200).json({
    message: "login success!!",
  });
});

module.exports = router;
