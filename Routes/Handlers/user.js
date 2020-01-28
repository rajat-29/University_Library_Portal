let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth = require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/updateUserProfile',auth, function(req,res) {
        res.render('updateUserProfile', {data: req.session});
})

app.get('/openissuedBookSpecificUser',auth, function(req,res) {
        res.render('issuedBookSpecificUser', {data: req.session});
})

// controllers //

app.use('/showIssuedBookSpecificUser',auth,userController.showIssuedBookSpecificUser);
app.use('/updateUserProfileDetails',auth,userController.updateUserProfileDetails);

module.exports = app;