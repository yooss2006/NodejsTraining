const express = require("express");
const upload = require("../../module/multer");
const router = express.Router();
const postCtr = require("../../controller/postCtr");
const checkUser = require("../../module/checkUser");

router.get("/upload", checkUser, (req, res) => {
  res.render("upload");
});

router.get("/:id", postCtr.detail);

router.get("/update/:id", checkUser, postCtr.updateLayout);

router.post("/", checkUser, upload.single("image"), postCtr.upload);
//수정은 put이지만 웹에서 form으로 보낼 때는 get, post 밖에 사용할 수 없으므로 post를 사용
router.post("/update/:id", checkUser, postCtr.update);
router.post("/delete/:id", checkUser, postCtr.delete);
router.post("/like/:id", checkUser, postCtr.like);
router.post("/comment/:id", checkUser, postCtr.comment);
module.exports = router;
