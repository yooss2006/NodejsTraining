const express = require("express");
const router = express.Router();
const authCtr = require("../../controller/authCtr");

router.post("/register", authCtr.register);
router.post("/login", authCtr.login);
// /auto/login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/logout", (req, res) => {
  //쿠키를 지우면 로그아웃된 것으로 판정한다.
  res.clearCookie("access_token");
  res.redirect("/");
});
module.exports = router;
