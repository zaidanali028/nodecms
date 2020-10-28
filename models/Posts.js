const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    postOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'

    },

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
        ref:'category'
    },
//The comment has to be an array because there will be multiple comments on posts
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
    }]

 //The {usePushEach:true} allow us to push to the comments array

},{usePushEach:true})


module.exports=mongoose.model('currentPosts',postSchema)