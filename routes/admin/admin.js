const express = require("express");
const router = express.Router();

const postSchema = require('../../models/Posts');



router.get('/', (req, res) => {
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

router.get('/dashboard',(req,res)=>{
  res.render('admin/dashboard')
})



module.exports = router;
