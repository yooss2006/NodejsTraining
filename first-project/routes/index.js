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
    //비동기로 움직임 언제 완료가 될지 모름
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

router.get("/", async (req, res) => {
  try {
    //    title이 first인 게시물만 가지고 올 때
    // const result = await postModel.find({title:"first"});
    const result = await postModel.find({});
    res.status(200).json({
      message: "read success!!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//id에 해당하는 데이터만 불러오는 경우
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.findById(id);
    res.status(200).json({
      message: "detail success!!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    //아이디 값으로 데이터를 찾고 업데이트 시키는 메서드
    const result = await postModel.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      {
        //아무것도 적지않으면 업데이트 전 데이터가 result에 저장
        //new true를 적으면 업데이터 후 데이터가 result에 저장된다.
        new: true,
      }
    );
    res.status(200).json({
      message: "update success!!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "delete success!!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
module.exports = router;
