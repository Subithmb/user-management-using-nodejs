var express = require("express");
const { collection } = require("../config/connection");
const { admincol } = require("../config/connection");
var router = express.Router();
var datahelper = require("../helpers/datahelper");
// const session=require("express-session")
const Promise = require("promise");
const nocache = require("nocache");
var userexist;
var invalid;
// console.log(datahelper);

// middleware
function middle(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/admin");
  }
}

//admin login

router.get("/admin", nocache(), function (req, res, next) {
  if (req.session.admin) {
    res.redirect("/display");
  } else {
    res.render("admin/admin-login", { invalid });
    invalid = null;
  }
});

// home page of admin

router.post("/view-products", function (req, res) {
  async function checking() {
    const admindata = {
      email: req.body.email,
      password: req.body.password,
    };
    const adminfind = await admincol.findOne({ email: admindata.email });
    if (adminfind == null) {
      invalid = "invalid fields";
      res.redirect("/admin");
    } else if (adminfind.password == admindata.password) {
      req.session.admin = true;
      res.redirect("/display");
      // res.render("view-products",{admin: true });
    } else if (adminfind.password != admindata.password) {
      res.redirect("/admin");
      invalid = "invalid password";
    }
  }
  checking();
});

router.get("/display", middle, function (req, res) {
  datahelper.tableinuser().then((alluserdata) => {
    res.render("view-products", { admin: true, alluserdata });
  });
});

// new user create
router.get("/add-product", (req, res) => {
  res.render("admin/add-product", { userexist });
  userexist = null;
});

router.post("/add-product", (req, res) => {
  const data = {
    name: req.body.name,
    lname: req.body.lname,
    email: req.body.email,
    pass: req.body.pass,
  };
  async function userexist1() {
    user1 = await collection.findOne({ email: data.email });
    if (user1) {
      res.redirect("add-product");
      userexist = "user already exist";
    } else {
      collection.insertMany([data]);

      res.redirect("/display");
    }
  }
  userexist1();
});
router.get("/logout-admin", (req, res) => {
  req.session.admin = false;
  res.render("admin/admin-login");
});
//  remove user

router.get("/removeuser/:id", (req, res) => {
  const userid = req.params.id;
  datahelper
    .deleteuser(userid)
    .then((update) => {
      res.redirect("/display");
      // res.render("view-products",userid);
    })
    .catch((err) => {
      console.log(err);
    });
});

// edit user

router.get("/useredit/:id", async (req, res) => {
  let id = req.params.id;
  const user = await collection.findOne({ _id: id });
  res.render("admin/user-edit", {
    id: user._id,
    name: user.name,
    lname: user.lname,
    email: user.email,
    pass: user.pass,
  });
});


router.post("/user-edit/:id", (req, res) => {
  datahelper.userupdate(req.params.id, req.body).then(() => {
    res.redirect("/display");
  });
});

module.exports = router;


