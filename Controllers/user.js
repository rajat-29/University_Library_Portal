var users = require('../Models/userSchema');
var category = require('../Models/categorySchema');
var books = require('../Models/BookSchema');
var authors = require('../Models/authorSchema');
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

exports.totalNoofUsers = (req, res) => {
          users.countDocuments(function(e,count){
                res.send(JSON.stringify(count));
   });
}

exports.totalNoofBooks = (req, res) => {
          books.countDocuments(function(e,count){
                res.send(JSON.stringify(count));
     });
}

exports.totalNoofCat = (req, res) => {
          category.countDocuments(function(e,count){
                res.send(JSON.stringify(count));
   });
}

exports.totalissuedBooks = (req, res) => {
          issueBookes.countDocuments(function(e,count){
                res.send(JSON.stringify(count));
   });
}

exports.totalNoofAuthors = (req, res) => {
          authors.countDocuments(function(e,count){
                res.send(JSON.stringify(count));
   });
}

exports.totalissuedBooksToUser = (req, res) => {
          issueBookes.countDocuments({uniId: req.session.uniId}, function(e,count){
                res.send(JSON.stringify(count));
   });
}