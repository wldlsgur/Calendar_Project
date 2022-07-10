var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");

//Function
const upload_function = require("./function/upload");

//Router
var indexRouter = require("./routes/index");
// var pageRouter = require('./routes/page');
// var checkRouter = require('./routes/check');
// var userRouter = require('./routes/user');
// let uploadimage = require('./routes/uploadimage');
var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/user"); // 파일 업로드 경로
  },
  filename: function (req, file, cb) {
    let userID = req.params.id;
    let timestamp = new Date().getTime().valueOf(); // 현재 시간
    let file_url = timestamp + userID + path.basename(file.originalname);

    if (upload_function.insert_image_url(userID, file_url) === false) {
      return;
    }
    cb(null, file_url);
  },
  limits: { fileSize: 1 * 256 * 256 },
});
const upload = multer({
  storage: storage,
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", indexRouter);
// app.use('/page', pageRouter);
// app.use('/user',userRouter);
// app.use('/check', checkRouter);
// app.post('/uploadimage/:id', upload.single('image'), uploadimage);//사진 한장

// catch 404 and forward to error handler
app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});
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
