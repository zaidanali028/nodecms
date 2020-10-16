const express = require("express");
const router = express.Router();

// you do not need to overwrite default layout

// router.all("/*", (req, res, next) => {
//   req.app.locals.layout = "admin";
//   next() 
// }); 




router.get("/", (req, res) => {
  res.render("admin/index");
});

module.exports = router;
