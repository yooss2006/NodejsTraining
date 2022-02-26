const multer = require("multer");
const multerS3 = require("multer-s3");
//aws에 접근할 수 있는 권한 부여
const aws = require("aws-sdk");
//aws.config에 s3Info.json 정보를 추가
aws.config.loadFromPath(__dirname + "/../config/s3Info.json");

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pet-sns-soon",
    acl: "public-read-write",
    key: (req, file, cb) => {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
});
//해당 파일 이름은 유니크 해야함
//dog.png 라면 [dog, png] => png만 가져옴

module.exports = upload;
