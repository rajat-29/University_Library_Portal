let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth = require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/openissuedBookSpecificUser',auth.checkUser, function(req,res) {
        res.render('issuedBookSpecificUser', {data: req.session});
})

// controllers //

app.use('/showIssuedBookSpecificUser',auth.checkUser,userController.showIssuedBookSpecificUser);

app.use('/totalNoofUsers',auth.checkAdmin,userController.totalNoofUsers);

app.use('/totalNoofBooks',auth.checkAdmin,userController.totalNoofBooks);

app.use('/totalNoofCat',auth.checkAdmin,userController.totalNoofCat);

app.use('/totalissuedBooks',auth.checkAdmin,userController.totalissuedBooks);

app.use('/totalNoofAuthors',auth.checkAdmin,userController.totalNoofAuthors);

app.use('/totalissuedBooksToUser',auth.checkAdmin,userController.totalissuedBooksToUser);

module.exports = app;