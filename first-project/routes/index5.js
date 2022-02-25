var express = require("express");
var router = express.Router();
const postModel = require("../model/post");

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  //클래스 형태로 정의, 하나의 기능을 수행할 때 필요한 변수, 함수를 묶어둔 것 new 클래스로 초기화가 가능하다.
  const post = new postModel({
    title: title,
    content: content,
  });
  try {
    //비동기로 움직임 언제 완료가 될지 모름 -> async await 문법 사용
    const result = await post.save();
    res.status(200).json({
      message: "upload success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
