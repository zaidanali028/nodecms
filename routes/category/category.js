const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

//Read
router.get("/", (req, res) => {
  Category.find({}).then((allCtegories) => {
    res.render("category/category", {
      postCategories: allCtegories,
      
    });
  });
});

//Create
router.post("/", (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name,
  });
  newCategory.save().then((savedCategory) => {
    res.redirect("/admin/category");
  });
});

//Update
router.put("/edit/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  Category.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
      },
    }
  ).then((updatedCategory) => {
    res.redirect("/admin/category/");
  });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  Category.findOne({ _id: id }).then((category) => {
    res.render("category/editCategory", {
      oldCategory: category,
    });
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete({ _id: id }).then((category) => {
    res.redirect("/admin/category/");
    category.remove();
  });
});

module.exports = router;
