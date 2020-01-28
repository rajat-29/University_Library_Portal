let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth=require('../../MiddleWares/auth');

let loginController = require('../../Controllers/login');

app.get('/home' ,auth, function(req,res) {           
    res.render('dashboard', {data: req.session});              
})

app.get("/404", function(req,res) {
   res.render("404");
})

app.get('/signup_page', function(req,res) {
        res.render('signup_users');
})

// controllers //

app.use('/checkLogin',loginController.checkLogin);

module.exports = app;