const multer = require("multer");

const storage = multer.diskStorage({
  //cb는 콜백함수를 의미
  destination: (req, file, cb) => {
    //cb의 첫번째는 에러 매개변수가 들어가야하므로 null, 두번째는 파일이 저장될 위치를 명시한다.
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//upload라는 해당 위치에 이미지를 저장하겠다.
// const upload = multer({ dest: "upload/" });
//다른 폴더에 저장하고 싶을 떄 사용
const upload = multer({ storage: storage });

module.exports = upload;
