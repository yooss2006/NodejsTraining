var express = require("express");
var router = express.Router();

let arr = [];

//get method
router.get("/read", (req, res) => {
  res.status(200).json({
    message: "read success",
  });
});

//post method
router.post("/create", (req, res) => {
  const { data } = req.body;
  arr.push(data);
  res.status(200).json({
    message: "ceate success",
    result: arr,
  });
});

//put method
//몇번째 업데이트인지 명시함
// /update/1 -> 1번째 데이터 업데이트
router.put("/update/:id", (req, res) => {
  //:id에 해당하는 부분을 가지고온다.
  const { id } = req.params;
  const { data } = req.body;
  arr[id] = data;
  res.status(200).json({
    message: "update success",
    result: arr,
  });
});

//delete method
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  //배열내 해당 index 기준으로 아이템 1개를 삭제한다.
  arr.splice(id, 1);
  res.status(200).json({
    message: "delete success",
    result: arr,
  });
});
module.exports = router;
