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
            res.send("false");
        else {
            bcrypt.compare(req.body.password,result.password,function(err,resi) {
                if(resi == true) {
                    req.session.isLogin = 1;
                    req.session.email = req.body.name;
                    req.session.uniId = result.uniId;
                    req.session.name = result.name;       
                    req.session.role = result.role;
                    req.session.phone = result.phone;
                    req.session.password = result.password;
                    res.send(req.session);  
                }
                else {
                  res.send("false")
                }
           })    
        }
    })     
}