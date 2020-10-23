const express = require("express");
const app = express();
const path = require("path");
const methodOverride=require('method-override')
const port = 2000 || process.env.PORT;
const ejs = require("ejs");
const mongoose = require("mongoose");
const uploader=require('express-fileupload')
const flash =require('connect-flash')
const session=require('express-session')
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

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

//This

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs",);
app.set(express.static(path.join(__dirname, "public")));


//flash message
app.use(flash())

const indexRoute = require("./routes/home/index");
const adminRoute = require("./routes/admin/admin");
const postsRoute = require("./routes/posts/posts");
const categoryRoute = require("./routes/category/category");

//declaring local variables for displaying FLASH messages
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg')
  res.locals.error_msg=req.flash('error_msg')
  next()
})

app.use("/", indexRoute);
app.use("/admin", adminRoute);
app.use("/admin/posts", postsRoute);
app.use("/admin/category", categoryRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
