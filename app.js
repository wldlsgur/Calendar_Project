var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

//Function
const upload_function = require("./function/upload");

//Router
var indexRouter = require("./routes/index");
var pageRouter = require("./routes/page");
var checkRouter = require("./routes/check");
var userRouter = require("./routes/user");
let uploadimage = require("./routes/uploadimage");
let roomRouter = require("./routes/room");
let calanderRouter = require("./routes/calander");
var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/user"); // 파일 업로드 경로
  },
  filename: function (req, file, cb) {
    let userID = req.params.id;
    let timestamp = new Date().getTime().valueOf(); // 현재 시간
    let file_url = timestamp + path.basename(file.originalname);

    upload_function.insert_image_url(userID, file_url);
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
app.use("/image", express.static("upload"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use("/", indexRouter);
app.use("/page", pageRouter);
app.use("/user", userRouter);
app.use("/check", checkRouter);
app.use("/room", roomRouter);
app.use("/calander", calanderRouter);
app.post("/uploadimage/:id", upload.single("image"), uploadimage); //사진 한장

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
