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