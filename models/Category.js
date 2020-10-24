const { date } = require("faker");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  } ,
  date: {
    type: Date,
    default: Date.now
  }

});

const Categorychema = mongoose.model("cateory", postSchema);
module.exports = Categorychema;
