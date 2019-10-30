let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.post('/checkLogin',function (req, res)  {

    req.session.isLogin = 0;
    var username = req.body.name;
    var pasword = req.body.password;
    users.findOne({email: username,password: pasword}, function(error,result)
    {
        if(error)
        throw error;

        if(!result) {
            res.send("false");
        }
        else {
                req.session.isLogin = 1;
                req.session.email = req.body.name;
                req.session.uniId = result.uniId;
                req.session.name = result.name;       
                req.session.role = result.role;
                res.send(req.session);     
        }
    })     
})

app.get('/home' , function(req,res) {       
    if(req.session.isLogin) 
    {      
            res.render('dashboard', {data: req.session});              
    } 
    else 
    {
        res.render('index');
    }
})

app.get("/404" ,function(req,res) {
   res.render("404");
})

app.get('/signup_page', function(req,res) {
        res.render('signup_users', {data: req.session});
})

module.exports = app;