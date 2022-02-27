const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretKey.json");

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    //로그인 되지않음을 표시하기 위해 빈 객체를 주었다.
    res.locals.isAuthenticated = {};
    return next();
  }
  try {
    const decoded = jwt.verify(token, secretKey.key);
    req.userInfo = {
      _id: decoded._id,
      username: decoded.username,
    };
    res.locals.isAuthenticated = { username: decoded.username };
    return next();
  } catch (error) {
    res.status(500).send("jwt error!");
  }
};

module.exports = jwtMiddleware;
