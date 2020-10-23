const express = require("express");
const Postschema = require("../../models/Posts");
const router = express.Router();
const faker = require("faker");
const moment=require('moment')
//Schemas
const postSchema = require("../../models/Posts");
const Category= require("../../models/Category");

router.get("/", (req, res) => {
  
  postSchema.find({})
 .populate('category')
   //You can get category collection without populating it but it wont be an object
  //Inorder to make it an object and get its name to the user,
  //I will have to populate its collection
  .then((posts) => {
    console.log(posts)
    res.render("admin/index", {
      allPosts: posts });
  });
});

router.get("/create", (req, res) => {
  Category.find({}).then(category=>{
    res.render("admin/createPosts",{
      cateGories:category
    });


  })
  

});

router.post("/create", async (req, res) => {
  
  let errors = [];
  const { title, status, description } = req.body;
  let { allowComments } = req.body;
  let fileName = "";
  let category=req.body.category
  if (!title || !status || !description) {
    errors.push({ msg: "Please fill in All Fields" });
  }
  if (description.length < 11210) {
    errors.push({ msg: "Description must be more than 10" });
  }

  if (errors.length > 0) {
    res.render("admin/createPosts", {
      errors,
      title,
      description,
    });
  }

  function isEmpty(object) {
    //am  checking if there is a key(uploader) in the object ,and if there is ,we will return true or false otherwise
    for (let key in object) {
      // console.log(key)
      if (object.hasOwnProperty(key)) {
        return true;
      }
      return false;
    }
  }

  const mainObject = req.files;
  if (isEmpty(mainObject)) {
    const fileObject = req.files.uploader;
    fileName = new Date().getSeconds() + "-" + fileObject.name;
    //the new Date().getSeconds+'-'+ is there to prevent duplicate picturename
    fileObject.mv("./public/uploads/" + fileName, (err) => {
      if (err) throw err;
      console.log("has something");
    });
  } else {
    req.flash("error_msg", "Please insert an image before proceeding");
    res.redirect("/admin/posts/create");
    //if the form is not having a picture,I redirect to the same directory
    console.log("Has nothing");
  }

  //handling allowcomments(if is on,we will overwrite on with true and false otherwise)
  if (allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  const newPost = new postSchema({
    title,
    status,
    category:category,
    allowComments,
    description,
    uploader: fileName,
  });
  newPost.save().then((newPostSaved) => {
    req.flash(
      "success_msg",
      `Successfuly created post with title ${newPostSaved.title}`
    );
    res.redirect("/admin/posts");
  });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  postSchema.findOne({ _id: id }).then((postFound) => {
    Category.find({}).then(category=>{
      res.render("admin/editPost",{gotPost: postFound,cateGories:category});
     
  
  
    })
 
  });
});

router.put("/edit/:id", (req, res) => {
  let errors = [];
  const { title, status, description } = req.body;
  let { allowComments } = req.body;
  let category=req.body.category
  let { id } = req.params;
  if (!title || !status || !description) {
    errors.push({ msg: "Please fill in All Fields" });
  }
  if (description.length < 10) {
    errors.push({ msg: "Description must be more than 10" });
  }

  if (errors.length > 0) {
    res.render("admin/createPosts", {
      errors,
      title,
      description,
    });
  }

  if (allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  function isEmpty(object) {
    //am  checking if there is a key(uploader) in the object ,and if there is ,we will return true or false otherwise
    for (let key in object) {
      // console.log(key)
      if (object.hasOwnProperty(key)) {
        return true;
      }
      return false;
    }
  }

  const mainObject = req.files;
  if (isEmpty(mainObject)) {
    const fileObject = req.files.uploader;
    fileName = new Date().getSeconds() + "-" + fileObject.name;
    //the new Date().getSeconds+'-'+ is there to prevent duplicate picturename
    fileObject.mv("./public/uploads/" + fileName, (err) => {
      if (err) throw err;
      console.log("has something");
    });
  } else {
    req.flash("error_msg", "Please insert an image before proceeding");

    res.redirect("/admin/posts/edit/:id");
    //if the form is not having a picture,I redirect to the same directory
    console.log("Has nothing");
  }

  Postschema.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        uploader: fileName,
        category:category,
        status: status,
        allowcomments: allowComments,
        description: description,
      }
    }
  ).then((updatedPost) => {
    req.flash("success_msg", "Successfully Updated Your Post");
    res.redirect("/admin/posts");
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  postSchema.findByIdAndDelete({ _id: id }).then((thePosts) => {
    thePosts.remove();
    req.flash('success_msg',`Successfully deleted post with id ${thePosts.id}`)
    res.redirect("/admin/posts");
  });
});

//dummpy data
router.get("/dummy", (req, res) => {
  res.render("admin/allPosts");
});

router.post("/dummy", (req, res) => {
  for (let i = 0; i < req.body.amount; i++) {
    const fakePost = new postSchema({
      title: faker.name.title(),
      status: "private",
      allowComments: faker.random.boolean(),
      description: faker.lorem.sentences(),
    });
    fakePost
      .save()
      .then((faked) => {
    req.flash('success_msg',`Successfully auto posted ${req.body.amount} posts`)

        res.redirect("/admin/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.delete("/clear", (req, res) => {
  //find{} finds all posts
  postSchema.find({}).then((allposts) => {
    //allposts are all posts in the database
    for (post of allposts) {
      //then here,for anypoost of all the posts,I got its id
      const postId = post.id;
      postSchema.findByIdAndDelete({ _id: postId }).then((gottenPost) => {
        gottenPost.remove();
      });
    }
    req.flash('success_msg',`Successfully deleted all posts`)

    res.redirect("/admin/posts");
  });
});
module.exports = router;
