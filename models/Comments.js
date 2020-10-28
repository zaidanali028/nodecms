const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  } ,
  //creating a relationship to reference the post User wants to comment on
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
  },
  date:{
    type:Date,
    default:new Date
  }

 
});

module.exports=mongoose.model('comments',commentSchema)
