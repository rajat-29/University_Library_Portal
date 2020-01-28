var users = require('../Models/userSchema');
var issueBookes = require('../Models/issueBookSchema');

exports.showIssuedBookSpecificUser = (req, res) => {
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
}

exports.updateUserProfileDetails = (req,res) => {  
        users.updateOne( { "uniId" : req.session.uniId}, {$set : req.body } , function(err,result)
        {
          if(err)
          throw err
          else         
            req.session.name = req.body.name;
            req.session.email = req.body.email;
            req.session.phone = req.body.phone;

            res.send("DATA UPDATED SUCCESFULLY")
        })
}