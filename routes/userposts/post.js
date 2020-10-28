const express=require('express')
const router=express.Router()
const User=require('../../models/User')
router.get('/:id',(req,res)=>{
    const user=req.params.id
    User.find({_id:user}).then(user=>{
        
    })
    res.render('home/userposts')
})

module.exports=router