var express = require("express");
var router = express.Router();
const authRouter = require("./auth");
const postRouter = require("./posts");

router.get("/", (req, res) => {
  res.render("index", { postList: [] });
});
// /auth 주소로 이동시 모든 요청을 authRouter로 보내겠다.
router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
