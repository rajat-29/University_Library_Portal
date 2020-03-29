const bcrypt = require('bcrypt');
let saltRounds = 10;

var users = require('../Models/userSchema');
var category = require('../Models/categorySchema');
var books = require('../Models/BookSchema');
var authors = require('../Models/authorSchema');
var issueBookes = require('../Models/issueBookSchema');

exports.addnewuser = (req,res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(!err) {
      req.body.password = hash;
      users.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else{}
      })         
    }
    else {}
  }) 
  res.send("data saved");
}

exports.addnewCategory = (req,res) => {
     category.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else{}
      })
     res.send("data saved");
}

exports.showcategories = (req, res) => {
    let query = {};
    let params = {};

    if(req.body.search.value)
        query.name = {"$regex" : req.body.search.value , "$options" : "i"};

    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {name : sortingType}};

    category.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else {
                category.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else {
                        category.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}

exports.category = (req,res) => {
      var id = req.params.pro.toString();
      category.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else 
            res.send("data deleted SUCCESFULLY")
      });
 }

exports.updateCategoryDetails = (req,res) => {  
        category.updateOne( { "name" : req.body.name}, {$set : req.body } , function(err,result)
        {
          if(err)
          throw err
          else 
            res.send("DATA UPDATED SUCCESFULLY")
        })
}

exports.addnewbook = (req,res) => {
     books.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else {}
      })
     res.send("data saved");
}

exports.categoryOptions = (req, res) => {
    category.find({status: 'Active'}, function(error,result)
    {
        if(error)
        throw error;
        else
          res.send(JSON.stringify(result));
    })
}

exports.authorOptions = (req, res) => {
    authors.find( function(error,result)
    {
        if(error)
        throw error;
        else
          res.send(JSON.stringify(result));
    })
}

exports.addnewAuthor = (req,res) => {
     authors.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else{}
      })
     res.send("data saved");
}

exports.checkemail = (req, res) => {
     users.findOne({email: req.body.email}, function(error,result)
      {
        if(error)
        throw error;

      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
}

exports.checkid = (req, res) => {
     users.findOne({uniId: req.body.uniId}, function(error,result)
      {
        if(error)
        throw error;

      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
}

exports.checkcat = (req, res) => {
     category.findOne({name: req.body.name}, function(error,result)
      {
        if(error)
        throw error;

      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
}

exports.checkauth = (req, res) => {
     authors.findOne({name: req.body.name}, function(error,result)
      {
        if(error)
        throw error;

      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
}

exports.checkisbn = (req, res) => {
     books.findOne({isbn: req.body.isbn}, function(error,result)
      {
        if(error)
        throw error;

      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
}

exports.issueNewBook = (req,res) => {
  issueBookes.create(req.body,function(error,result) {
    if(error)
      throw error;
    else{
      res.send("data");
    }
  })
}

exports.checknameusingUniId = (req, res) => {
     users.findOne({uniId: req.body.uniId}, function(error,result)
      {
        if(error)
        throw error;

      if(!result) 
        res.send("false");
      else
        res.send(JSON.stringify(result));
      })
}

exports.checkbookusingIsbn = (req, res) => {
     books.findOne({isbn: req.body.isbn}, function(error,result)
      {
        if(error)
        throw error;

      if(!result) 
        res.send("false");
      else 
           res.send(result.name);
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
              else {}
          }) 
          res.send("true")
    }
}

exports.showStudents = (req, res) => {
  let query = {};
  let params = {};

  if(req.body.search.value) {
     query["$or"]= [{
            "name":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "role":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "uniId": { '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "phone":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
  }
  else{
      delete query["$or"];
  }

  let sortingType;
  if(req.body.order[0].dir === 'asc')
    sortingType = 1;
  else
    sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {uniId : sortingType}};
    else if(req.body.order[0].column === '1')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {name : sortingType}};

        users.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else {
                users.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else {
                        users.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}

exports.students = (req,res) => {
      var id = req.params.pro.toString();
      users.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else
              res.send("data deleted SUCCESFULLY")
      });
}

exports.showauthor = (req, res) => {
    let query = {};
    let params = {};

    if(req.body.search.value){
        query.name = {"$regex" : req.body.search.value , "$options" : "i"};
    }

    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {name : sortingType}};
   
    authors.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else {
                authors.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else {
                        authors.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}

exports.author = (req,res) => {
      var id = req.params.pro.toString();
      authors.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else 
              res.send("data deleted SUCCESFULLY")
      });
}

exports.showBooks = (req, res) => {
  let query = {};
  let params = {};
    
    if(req.body.search.value) {
     query["$or"]= [{
            "name":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "category":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "author": { '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "isbn":  { '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "price": { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
  }
  else{
      delete query["$or"];
  }

    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {name : sortingType}};

    books.find(query , {} , params , function (err , data)
    {
            if(err)
                console.log(err);
            else {
                books.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else {
                        books.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}

exports.book = (req,res) => {
      var id = req.params.pro.toString();
      books.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else 
              res.send("data deleted SUCCESFULLY")
      });
}

exports.issuedBook = (req,res) => {
      var id = req.params.pro.toString();
      issueBookes.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else
              res.send("data deleted SUCCESFULLY")
      });
}

exports.showIssuedBooks = (req, res) => {
  let query = {};
  let params = {};

    if(req.body.search.value) {
     query["$or"]= [{
            "studentName":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "uniId":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "bookName": { '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "isbn":  { '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "ReturnDate": { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
  }
  else{
      delete query["$or"];
  }

   let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

        if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {uniId : sortingType}};
   
        issueBookes.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else {
                issueBookes.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else {
                        issueBookes.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}

exports.updateIssuedBookDetails = (req,res) => {
        issueBookes.updateOne( { "_id" : req.body._id}, {$set : req.body } , function(err,result)
        {
          if(err)
          throw err
          else
            res.send("DATA UPDATED SUCCESFULLY")
        })
}

exports.logout_person = (req,res) => {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('login');
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

exports.getIssuedBookData = (req, res) => {
    issueBookes.find({}, function(error,result)
    {
        if(error)
        throw error;
        else
          res.send(JSON.stringify(result));
    })
}