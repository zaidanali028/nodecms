const mongoose=require('mongoose')
const urlSlug=require('mongoose-url-slugs')
const postSchema=new mongoose.Schema({
    postOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'

    },

    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
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

postSchema.plugin(urlSlug('title',{field:'slug'}))
//Am extending the capability of the Schema by adding the slug plugin
//on line 53, I am saving the post's title to the slug key
module.exports=mongoose.model('currentPosts',postSchema)