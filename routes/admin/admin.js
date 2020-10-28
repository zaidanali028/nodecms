const express = require("express");
const router = express.Router();
const {ensureAuthenticated}=require('../../config/auth')
const postSchema = require('../../models/Posts');
const Comment=require('../../models/Comments')
const Post=require('../../models/Posts.js')

router.get('/',ensureAuthenticated, (req, res) => {
  postSchema.find({})
      .populate('category')
      //You can get category collection without populating it but it wont be an object
      //Inorder to make it an object and get its name to the user,
      //I will have to populate its collection
      .then((posts) => {
        res.render("admin/index", {
          allPosts: posts });
      });
});

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
  res.render('admin/dashboard',{
    username:req.user.firstName+' '+req.user.lastName

  })
})


router.get('/comment',(req,res)=>{
  //I want only comment by a specific user(logged in user)
  Comment.find({user:req.user._id})
  .populate('user')
  //the user property that has a user id as its value ss populated to get it as 
  //an object so I can use dot notation on it
 .then(allComments=>{
  
  
  res.render('comment/comment',{allComments})


  })

})

router.get('/logout',(req,res)=>{
  req.logOut()
  req.flash('success_msg','Successfully logged out,see you Soon!')
  res.redirect('/login')
})

module.exports = router;
