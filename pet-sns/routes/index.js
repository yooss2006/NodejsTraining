var express = require("express");
var router = express.Router();
const authRouter = require("./auth");
const postRouter = require("./posts");
const postCtr = require("../controller/postCtr");

// index로 접근시 postCtr의 list를 보여준다.
router.get("/", postCtr.list);
// /auth 주소로 이동시 모든 요청을 authRouter로 보내겠다.
router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
