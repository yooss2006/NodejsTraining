var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var templateRouter = require("./routes/template");
const session = require("express-session");

var app = express();

//세션 사용 준비
app.use(
  session({
    //secret은 세션을 암호화하기 위해 필요한 값
    secret: "first project",
    //세션을 변경하지 않아도 변경할지말지를 결정
    resave: false,
    //세션이 저장되기 전 이를 초기화할지 말지를 결정
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// //미들웨어 작성
// app.use((req, res, next)=>{
//   console.log("middleware");
//   next();
// })

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/template", templateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
