const express = require('express');
const path = require('path')
const cookieParser = require("cookie-parser");
const axios = require('axios');
const auth = require('./middleware/auth')
const db = require('./config/db')
const push = require('./controllers/register')
const app = express();
const check  = require('./controllers/login')
const { compilePHP } = require('./controllers/phpCompiler')
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: 'FFFFFF', // replace with your own secret
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// To make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');  // for success messages
  res.locals.error_msg = req.flash('error_msg');      // for error messages
  next();
});





app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){
    res.cookie("email","")
    res.render("index")
})

app.get("/home",auth ,function(req,res){
    res.render("home")
})
app.get("/languages",auth ,function(req,res){
    res.render("lang")
})
app.get("/python/compailer",auth ,function(req,res){
    res.render("editor/python")
})
app.get("/javascript/compailer",auth ,function(req,res){
    res.render("editor/javascript")
})
app.get("/java/compailer",auth ,function(req,res){
    res.render("editor/java")
})
app.get("/Cpp/compailer",auth ,function(req,res){
    res.render("editor/CPP")
})
app.get("/Csharp/compailer",auth ,function(req,res){
    res.render("editor/Csharp")
})
app.get("/swift/compailer",auth ,function(req,res){
    res.render("editor/swift")
})
app.get("/go/compailer",auth ,function(req,res){
    res.render("editor/go")
})
app.get("/rust/compailer",auth ,function(req,res){
    res.render("editor/rust")
})
app.get("/php/compailer",auth ,function(req,res){
    res.render("editor/php")
})
app.get("/ruby/compailer",auth , function(req,res){
    res.render("editor/ruby")
    
})
app.get("/c/compailer",auth,function(req,res){
    res.render("editor/c")
})

app.get("/sql/compailer",auth,function(req,res){
    res.render("editor/sql")
})
app.get("/html-css/compailer",auth,function(req,res){
    res.render("editor/htmlcss")
})

app.get("/login",function(req,res){
    res.render("auth")
})
app.get("/register",function(req,res){
    res.render("auth")
})

app.post("/register/user",async function(req,res){
    let data = {name,email,password} = req.body
    push(req,res,name,email,password)
})
app.post("/login/user",async function(req,res){
    let data = {email,password} = req.body
    check(req,res,email,password)
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
