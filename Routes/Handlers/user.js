let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth = require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/openissuedBookSpecificUser',auth, function(req,res) {
        res.render('issuedBookSpecificUser', {data: req.session});
})

// controllers //

app.use('/showIssuedBookSpecificUser',auth,userController.showIssuedBookSpecificUser);

module.exports = app;