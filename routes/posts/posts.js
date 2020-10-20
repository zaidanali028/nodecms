const express = require("express");
const Postschema = require("../../models/Posts");
const router = express.Router();
const faker = require("faker")
//Schema
const postSchema = require("../../models/Posts");

router.get("/", (req, res) => {
  postSchema.find({}).then((posts) => {
    res.render("admin/index", {
      allPosts: posts,
    });
  });
});

router.get("/create", (req, res) => {
  res.render("admin/createPosts");
  // res.send('create posts route on fire')
});

router.post("/create", (req, res) => {
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
    const fileName = new Date().getSeconds()  +'-'+fileObject.name;
    //the new Date().getSeconds+'-'+ is there to prevent duplicate picturename
    fileObject.mv("./public/uploads/" + fileName, (err) => {
      if (err) throw err;
      console.log("has something");
    });
  } else {
    res.redirect('/admin/posts/create')
    //if the form is not having a picture,I redirect to the same directory
    console.log("Has nothing");
  }

  const { title, status, description } = req.body;
  let { allowComments } = req.body;
   let fileNamer = req.files.uploader.name;
  //handling allowcomments(if is on,we will overwrite on with true and false otherwise)
  if (allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  const newPost = new postSchema({
    title,
    status,
    allowComments,
    description,
    uploader: fileNamer
  });
  newPost.save().then((newPostSaved) => {
    res.redirect("/admin/posts");
  })
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  postSchema.findOne({ _id: id }).then((userFound) => {
    res.render("admin/editPost", {
      gotUser: userFound,
    });
  });
});

router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  let { title, status, description } = req.body;
  if (allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  Postschema.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        status: status,
        allowcomments: allowComments,
        description: description,
      },
    }
  ).then((updatedPost) => {
    res.redirect("/admin/posts");
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  postSchema.findByIdAndDelete({ _id: id }).then((thePosts) => {
    thePosts.remove();
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
    res.redirect("/admin/posts");
  });
});
module.exports = router;
