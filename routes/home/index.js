const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//Schema
const postSchema = require("../../models/Posts");
const Category = require("../../models/Category");
const newUser = require("../../models/User");
const Comment=require('../../models/Comments')

//Passport-auth
const passport=require('passport');
const { populate } = require("../../models/Posts");

router.get("/", (req, res) => {
  postSchema.find({}).then((foundPosts) => {
    Category.find({}).then((foundCategory) => {
      res.render("home/index", {
        allPosts: foundPosts,
        gotten: foundCategory,
      });
    });
  });
});
router.get("/post/:id", (req, res) => {
const { id } = req.params;
  postSchema.findOne({ _id: id })
  .populate('postOwner')
  ///?
  .populate({path:'comments',populate:{path:'user',model:'users'}})
  
  .then((singlePost) => {
   //console.log(singlePost.comments);
    Category.find({}).then((foundCategory) => {
      res.render("home/post", {
        post: singlePost,
        gotten: foundCategory,
      });
    });
  });
});

router.get("/about", (req, res) => {
  res.render("home/about");
});

router.get("/register", (req, res) => {
  res.render("home/register");
});

router.post("/register", (req, res) => {
  let errors = [];
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  if (password != passwordConfirm) {
    errors.push({ msg: "Both passwords must be the same!" });
    res.render("home/register", {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      errors,
    });
  }
  newUser.findOne({email:email}).then(user=>{
    if(user){
    errors.push({ msg: "Email Already registered!" });
    res.render("home/register", {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        errors,
      });
}
  })
  const User = new newUser({
    firstName,
    lastName,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(User.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        User.password = hash;
        User.save().then((savedUser) => {
          req.flash(
            "success_msg",
            "You have successfully regitered and can now login"
          );
          res.redirect("/login");
        }).catch(err=>console.log(err))
        
      }
    })
  );
});
router.get("/login", (req, res) => {
  res.render("home/login");
});
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/admin/dashboard',
    failureRedirect:'/login',
    failureFlash:true
})(req,res,next)
//I want (req,res,next) function to execute as soon as I post to login
})
module.exports = router;
