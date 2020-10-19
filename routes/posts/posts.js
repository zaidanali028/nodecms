const express = require("express");
const Postschema = require("../../models/Posts");
const router = express.Router();
const faker = require("faker");
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
  const { title, status, description } = req.body;

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
  });
  newPost.save().then((newPostSaved) => {
    res.redirect("/admin/posts");
  });
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
