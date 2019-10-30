let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose');

var users = require('../Models/userSchema');
var category = require('../Models/categorySchema');
var books = require('../Models/BookSchema');
var authors = require('../Models/authorSchema');
var issueBookes = require('../Models/issueBookSchema');

app.post('/showIssuedBookSpecificUser' , function(req, res) {
    var flag;
      issueBookes.countDocuments({uniId: req.session.uniId},function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);
      issueBookes.find({uniId: req.session.uniId
      }).skip(start).limit(len)
    .then(data=> {
       if (req.body.search.value)
                    {
                        data = data.filter((value) => {
                            flag = value.isbn.includes(req.body.search.value) || value.uniId.includes(req.body.search.value);
            return flag;
                        })
                    } 
      res.send({"recordsTotal": count, "recordsFiltered" : count, data})
     })
     .catch(err => {
      res.send(err)
     })
   });
})

app.post('/updateUserProfileDetails', function(req,res) {  
        users.updateOne( { "uniId" : req.session.uniId}, {$set : req.body } , function(err,result)
        {
          if(err)
          throw err
          else
          {
            res.send("DATA UPDATED SUCCESFULLY")
          }
        })
})

app.get('/updateUserProfile', function(req,res) {
    if(req.session.isLogin)
    {
        res.render('updateUserProfile', {data: req.session});
    }
    else
    {
        res.render('index');
    }
})

app.get('/openissuedBookSpecificUser', function(req,res) {
    if(req.session.isLogin)
    {
        res.render('issuedBookSpecificUser', {data: req.session});
    }
    else
    {
        res.render('index');
    }
})

module.exports = app;