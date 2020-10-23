const express = require("express");
const router = express.Router();
//Schema
const postSchema = require("../../models/Posts");
const Category = require("../../models/Category");

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
  // postSchema.findOne({_id:id})
  // .then(singlePost=>{
  //     res.render('home/post',{
  //         post:singlePost
  //     })
  // })
  const { id } = req.params;
  postSchema.findOne({_id:id}).then((singlePost) => {
    Category.find({}).then((foundCategory) => {
      res.render("home/post", {
        post:singlePost,
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
  res.render("home/register");
});
router.get("/login", (req, res) => {
  res.render("home/login");
});

module.exports = router;
