const bcrypt = require('bcrypt');
let saltRounds = 10;

var users = require('../Models/userSchema');

exports.checkLogin = (req, res) => {
    req.session.isLogin = 0;
    users.findOne({email: req.body.name}, function(error,result)
    {
        if(error)
        throw error;

        if(!result) 
            res.send("notexits");
        else {
            bcrypt.compare(req.body.password,result.password,function(err,resi) {
                if(resi == true) {
                    req.session.isLogin = 1;
                    req.session._id = result._id;
                    req.session.uniId = result.uniId;
                    req.session.name = result.name;       
                    req.session.role = result.role;
                    
                    var re = req.session.redirectUrl || '/login/home';
                    res.send(re);
                }
                else {
                  res.send("false")
                }
           })    
        }
    })     
}

exports.changePasswordDatabase = (req,res) => {
    if(req.body.oldpass != req.session.password)
      res.send("Incorrect Old Password");
    else {
      bcrypt.hash(req.body.newpass, saltRounds, (err, hash) => {
              if(!err) {
                users.updateOne({"email" : req.session.email},{$set: { "password" : hash}} ,
                  function(error,result)
                  {
                    if(error)
                      throw error;
                    else
                      req.session.password = req.body.newpass;
                  })   
              }
              else {
              res.send("true")
          }
        })   
    }
}       

exports.logout_person = (req,res) => {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('login');
}