var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var userRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var fileupload=require('express-fileupload');
const cors=require('cors')
var app = express();
const session=require("express-session")
 const collection=require('./config/connection');
 const admincol = require("./config/connection");
const Promise=require('promise')
const nocache=require('nocache')
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
  })
);
app.use(cors())
app.use(session({secret:'key',saveUninitialized:true,cookie:{maxAge:600000},resave:false}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use("/", userRouter);
app.use("/",adminRouter);
app.use(nocache());

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
