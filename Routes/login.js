let express = require('express');
var app = require('express').Router();
let path = require('path');
const bcrypt = require('bcrypt');
let saltRounds = 10

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

var auth=require('../MiddleWares/auth');

app.post('/checkLogin',function (req, res)  {
    req.session.isLogin = 0;
    users.findOne({email: req.body.name}, function(error,result)
    {
        if(error)
        throw error;

        if(!result) 
            res.send("false");
        else {
            bcrypt.compare(req.body.password,result.password,function(err,resi) {
                if(resi == true) {
                    req.session.isLogin = 1;
                    req.session.email = req.body.name;
                    req.session.uniId = result.uniId;
                    req.session.name = result.name;       
                    req.session.role = result.role;
                    req.session.password = result.password;
                    res.send(req.session);  
                }
                else {
                  res.send("false")
                }
           })    
        }
    })     
})

app.get('/home' ,auth, function(req,res) {           
    res.render('dashboard', {data: req.session});              
})

app.get("/404", function(req,res) {
   res.render("404");
})

app.get('/signup_page', function(req,res) {
        res.render('signup_users');
})

module.exports = app;