const express = require("express");
const app = express();
const path = require("path");
const methodOverride=require('method-override')
const port = 2000 || process.env.PORT;
const ejs = require("ejs");
const mongoose = require("mongoose");
const uploader=require('express-fileupload')
//db connection
mongoose.connect("mongodb://localhost:27017/mycms")
  .then((connected) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });


//express-fileupload middleware
app.use(uploader())
//body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
 //static files
app.use(express.static(path.join(__dirname, "./public")));
//method override to be used for sending put requests
app.use(methodOverride('_method'))


//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs",);
app.set(express.static(path.join(__dirname, "public")));


const indexRoute = require("./routes/home/index");
const adminRoute = require("./routes/admin/admin");
const postsRoute = require("./routes/posts/posts");

//requiring helper function

app.use("/", indexRoute);
app.use("/admin", adminRoute);
app.use("/admin/posts", postsRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
