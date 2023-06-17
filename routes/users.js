var express = require("express");
var router = express.Router();
const {collection} = require("../config/connection");
const session=require('express-session')
var  userexist1;
var invalid;
const nocache=require('nocache')

//user get login 

router.get("/",nocache(),(req, res)=>{
  if(req.session.user && req.session.user.loggedIn){
    res.render("user/user-home",{user:true});
  }
 else{

   res.render("user/user-login",{invalid});
   invalid:null;
 }
});


//login user

router.post("/submit",(req,res)=>{
async function checking(){
   const userdata={
    email:req.body.email,
    pass:req.body.pass
      }
      const  userfind=await collection.findOne({email:userdata.email})
        if(userfind==null){
           invalid='invalid email'
          res.redirect("/")
         }
        else if(userfind.pass==userdata.pass){
          req.session.user={}
          req.session.user.id=userfind._id
          req.session.user.name=userfind.name
          req.session.user.loggedIn=true
          
          res.render("user/user-home",{user:true});
        }
        else if(userfind.pass!=userdata.pass){
          res.redirect("/");
          invalid='invalid password'
        }
      }
     checking();
})

//user home 

router.get('/index',(req,res)=>{
  res.render("index",{user:true});
})

//user get signup

router.get('/user-login',(req,res)=>{
  res.render("user/user-login");
})

// singn get up user

  router.get("/user-signup",(req,res)=>{
    res.render("user/user-signup",{userexist1});
    userexist1=null
  })

  //user signup

  router.post("/user-signup",(req,res)=>{
  const data={
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        pass:req.body.pass
  }
  async function userexist(){
      user1=await collection.findOne({email:data.email})
      if(user1){
      userexist1='user already exist'
      res.redirect("/user-signup")
     }
      
    else  {
      collection.insertMany([data])
       res.render("user/user-login");
        }
        
      }
 userexist();
})
// user log-out

router.get('/logout-user',nocache(),(req,res)=>{
  res.render("user/user-login",{invalid})
})
module.exports = router;
