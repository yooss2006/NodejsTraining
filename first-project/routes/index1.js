var express = require("express");
var router = express.Router();

/* GET home page. */

router.post("/main", (req, res) => {
  // res.json({
  //   message: "success!!",
  // });
  const data = req.body.data;

  //send 문자열을 응답할 수 있을 때 사용
  // res.send("문자열이 응답됩니다.");

  // //json은 json 형태의 객체로 응답할 수 있을 때 사용한다.
  // res.json({
  //   message: "json 응답",
  // });

  //  html 코드를 브라우저 상에 보여줄 때 사용
  res.render("index", { title: "Express" });
});

module.exports = router;
