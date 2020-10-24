const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
const {ensureAuthenticated}=require('../../config/auth')

//Read
router.get("/",ensureAuthenticated, (req, res) => {
  Category.find({}).lean().then((allCtegories) => {
    res.render("category/category", {
      postCategories: allCtegories,
      
    });
  });
});

//Create
router.post("/",ensureAuthenticated, (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name,
  });
  newCategory.save().then((savedCategory) => {
    res.redirect("/admin/category");
  });
});

//Update
router.put("/edit/:id", ensureAuthenticated,(req, res) => {
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

router.get("/edit/:id",ensureAuthenticated, (req, res) => {
  const { id } = req.params;
  Category.findOne({ _id: id }).then((category) => {
    res.render("category/editCategory", {
      oldCategory: category,
    });
  });
});

router.delete("/delete/:id", ensureAuthenticated,(req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete({ _id: id }).then((category) => {
    res.redirect("/admin/category/");
    category.remove();
  });
});

module.exports = router;
