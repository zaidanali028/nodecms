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
// const {dbUrl}=require('./config/keys')
 const db=require('./config/keys')
 const dbUrI=db.dbUrl

 //passport-module
const passport=require('passport')
//passport config
require('./config/passport')(passport)
//the(passport)argument is what the ./config/passport module is going to use in authenticating user

//db connection
mongoose.connect(dbUrI, {useNewUrlParser: true, useUnifiedTopology: true})
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

  //This should alwayse between session and flash
  app.use(passport.initialize());
  app.use(passport.session());

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
const commentRoute = require("./routes/comments/comment");

const { dbUrl } = require("./config/keys");

//declaring local variables for displaying FLASH messages
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg')
  res.locals.error_msg=req.flash('error_msg')
  res.locals.error=req.flash('error')

  next()
})

app.use("/", indexRoute);
app.use("/admin", adminRoute);
app.use("/admin/posts", postsRoute);
app.use("/admin/category", categoryRoute);
app.use('/user/comment',commentRoute)

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
