let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth=require('../../MiddleWares/auth');

let loginController = require('../../Controllers/login');

app.get('/home' ,auth.checkSession, function(req,res) {  
	if(req.session.role == 'Admin') {
		res.render('dashboard', {data: req.session}); 
	}  
	else {
		res.render('userdashboard', {data: req.session}); 
	}                    
})

app.get('/changePassword',auth.checkSession, function(req,res) {
      res.render('changePassword', {data: req.session});
})


// controllers //

app.use('/checkLogin',loginController.checkLogin);

app.use('/changePasswordDatabase',auth.checkSession,loginController.changePasswordDatabase);

app.use('/logout_person',auth.checkSession,loginController.logout_person);

module.exports = app;