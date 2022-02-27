const User = require("../model/auth");
const bcrypt = require("bcrypt");
//secretKey는 내가 임의로 정한 문자열이다.
const secretKey = require("../config/secretKey.json");
const jwt = require("jsonwebtoken");

const authCtr = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const exist = await User.findOne({ username: username });
    if (exist) {
      res.status(504).send("user exist!!");
      return;
    }

    const user = new User({
      username: username,
    });

    //암호호해 db에 저장
    //해시 알고리즘을 10번 돌려 암호화 하겠다.
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.redirect("/");
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(500).send("user not found");
      return;
    }
    //두개의 패스워드를 비교함
    const vaild = await bcrypt.compare(password, user.password);
    if (!vaild) {
      res.status(500).send("password invalid");
    }

    //user를 json 형태로 만들고 비밀번호는 보이면 안되기에 제거한다.
    const data = user.toJSON();
    delete data.password;
    const token = jwt.sign(
      {
        _id: data._id,
        username: data.username,
      },
      secretKey.key,
      {
        //기한을 두고 하는것으로 7일로 함
        expiresIn: "7d",
      }
    );
    //쿠키에 access_token이란 이름으로 토큰을 저장하는데 기한은 7일, http에서만 가능하게 설정했다.
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.redirect("/");
  },
};

module.exports = authCtr;
