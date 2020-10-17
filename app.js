const express = require("express");
const app = express();
const path = require("path");
//const randomPort = Math.floor(Math.random() * 3000);

const port = 2000 || process.env.PORT;
const ejs = require("ejs");
const mongoose = require("mongoose");

//db connection
mongoose.connect("mongodb://localhost:27017/mycms")
  .then((connected) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

//body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
 //static files
app.use(express.static(path.join(__dirname, "./public")));

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));


const indexRoute = require("./routes/home/index");
const adminRoute = require("./routes/admin/admin");
const postsRoute = require("./routes/posts/posts");

app.use("/", indexRoute);
app.use("/admin", adminRoute);
app.use("/admin/posts", postsRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
