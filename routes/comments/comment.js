const express = require("express");
const router = express.Router();
const Post = require("../../models/Posts");
const Comment = require("../../models/Comments");

const {ensureAuthenticated} = require('../../config/auth')

router.post("/:id", (req, res) => {
  //NOTE:A USER MUST LOGIN BEFORE HAVING ACCESS TO PASSPORT'S  req.user object
  //A user want to comment :What to do?
  //1.get user(by id)
  //2.get user comment(by body name="body")
  const { body } = req.body;
  const { id } = req.params;
  Post.findOne({ _id: id }).then((post) => {
    //3.After finding user,Lets push comment to that user's model
    // console.log(post)
    const loggedinUser=req.user._id
 
    const newComment = new Comment({
      body,
      user: loggedinUser,
      //the user key takes a value of req.user.id from passport,so we can reference the user who made the comment
    });
    post.comments.push(newComment);
    //console.log(newComment)
    //on line 21,the gotten post by id has a comment property which is an array
    //and am pushing the new comment to that array
    post.save()
      //this will save the id of the new comment in the post.comments array
      .then((savedPost) => {
         // saving our comment with the user who commented id
        newComment.save()
        .then((savedComment) => {
           // console.log(savedComment)
          res.redirect(`/post/${post.id}`);
        });
      });
  });
});

router.delete('/delete/:id',(req,res)=>{
      const {id}=req.params
      Comment.findOne({_id:id})
      .then(commentFound=>{
        commentFound.remove()
        req.flash('success_msg','Successfully deleted comment')
        res.redirect('/admin/comment')
      })
  

})
module.exports = router;
