const express=require('express')
const app=express()
const path=require('path')
const port=6060||process.env.PORT
const expressLayouts = require('express-ejs-layouts')
const exphbs=require('express-handlebars')

const indexRoute=require('./routes/home/index')
const adminRoute=require('./routes/admin/admin')

app.use('/',indexRoute)
app.use('/admin',adminRoute)

//static files
app.use(express.static(path.join(__dirname,'./public')))

//handlebars
//my problem is here bro
app.engine('handlebars',exphbs({defaultLayout:'home'}))
app.set('view engine', 'handlebars')


app.get('/',(req,res)=>{
    res.render('home')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})