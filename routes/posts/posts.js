const express=require('express')
const router=express.Router()

//Schema
const postSchema=require('../../models/Posts')
router.get('/',(req,res)=>{

  res.render('admin/allPosts')
    //  res.render('admin/allPosts')
  })
  
  router.get('/create',(req,res)=>{
    res.render('admin/createPosts')
    // res.send('create posts route on fire')

  })

  router.post('/create',(req,res)=>{
    let {title,status,allowComments,description}=req.body
    //handling allowcomments
    if(allowComments){
      allowComments=true
    }else{
      allowComments=false
    }
    const newPost=new postSchema({
        title,
        status,
        allowComments,
        description
    })
    newPost.save()
    .then(newPostSaved=>{
        res.redirect('/admin/posts')
    })
    // res.send('Create Posts')
  })

 module.exports=router