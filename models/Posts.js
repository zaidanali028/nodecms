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
    }




})

const Postschema=mongoose.model('currentPosts',postSchema)
module.exports=Postschema