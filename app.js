const express=require('express')
const app=express()
const path=require('path')
const port=6060||process.env.PORT
const ejs = require('ejs')


//static files
app.use(express.static(path.join(__dirname,'./public')))


//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.set(express.static(path.join(__dirname, 'public')))

//body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const indexRoute=require('./routes/home/index')
const adminRoute=require('./routes/admin/admin')

app.use('/',indexRoute)
app.use('/admin',adminRoute)


app.get('/',(req,res)=>{
    res.render('home')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})