const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public',
    },
    
    allowComments:{
        type:Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uploader:{
        type:String,
       
    },
    date:{
        type:Date,
        default:new Date
    },
    //This is a reference id of category from the category model
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cateory'
    }



})

const Postschema=mongoose.model('currentPosts',postSchema)
module.exports=Postschema