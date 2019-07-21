var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var mongodb = require('mongodb');
var MongoDataTable = require('mongo-datatable');
ObjectId = require('mongodb').ObjectID;
var MongoClient = mongodb.MongoClient;
var userdata = new Object();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'/public'))) /*folder path*/

app.use(express.urlencoded({extended: true}))
app.use(express.json())									/*include express*/
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: true,
}))

var mongoose = require('mongoose');						/*include mongo*/
var mongoDB = 'mongodb://localhost/libraryManagement';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB,{ useNewUrlParser: true});

mongoose.connection.on('error',(err) => {					/*database connect*/
    console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    console.log('DB connected');
})

// user data base scehema //
var userSchema = new mongoose.Schema({					/*define structure of database*/
    name: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    gender: String,
    dob: String,
    role: String,   
    status: String,
    flag: Number, 
})

var categorSchema = new mongoose.Schema({
    name: String,
    status: String,
    createDate: String,
})

var BookSchema = new mongoose.Schema({
    name: String,
    category: String,
    author: String,
    isbn: String,
    price: String,
})

var users = mongoose.model('students', userSchema);
var category = mongoose.model('categories', categorSchema);
var books = mongoose.model('books', BookSchema);

// login checking //
app.post('/checkLogin',function (req, res)  {

    req.session.isLogin = 0;
    var username = req.body.name;
    var pasword = req.body.password;
    console.log(pasword)
    users.findOne({email: username,password: pasword}, function(error,result)
    {
        if(error)
        throw error;

        if(!result) 
        {
            console.log('not exits');
            res.send("false");
        }
        else
        {
            console.log(result)
            if(result.flag == 0)
            {
                res.send("false");
            }
            else 
            {
                req.session.isLogin = 1;
                req.session.email = req.body.name;
                req.session.password = req.body.password;

                userdata.name = result.name;
                userdata.email = result.email;         
                userdata.role = result.role;

                res.send("true");
            }
        }
    })     
})

// admin side //
app.get('/home' , function(req,res) {        /*get data */
    if(req.session.isLogin) 
    {
        if(userdata.role == 'Admin')
        {
            res.render('dashboard', {data: userdata});         
        }
    } 
    else 
    {
        res.render('index');
    }
})

// render signup page
app.get('/signup_page', function(req,res) {
        res.render('signup_users', {data: userdata});
})

app.post('/addnewuser', function(req,res) {
     users.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else
        {
          console.log(result);
        }
      })
     res.send("data saved");
})

// render add category page
app.get('/add_category', function(req,res) {
    if(req.session.isLogin)
    {
        res.render('add_category', {data: userdata});
    }
    else
    {
        res.render('index');
    }
})

// render manage category page
app.get('/manage_category', function(req,res) {
    if(req.session.isLogin)
    {
        res.render('manage_category', {data: userdata});
    }
    else
    {
        res.render('index');
    }
})

app.post('/addnewCategory', function(req,res) {
     category.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else
        {
          console.log(result);
        }
      })
     res.send("data saved");
})

//datatables on categories
app.post('/showcategories' , function(req, res) {
    var flag;
          category.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);
      category.find({
      }).skip(start).limit(len)
    .then(data=> {
       if (req.body.search.value)
                    {
                        data = data.filter((value) => {
                            flag = value.name.includes(req.body.search.value) || value.createDate.includes(req.body.search.value)
             || value.status.includes(req.body.search.value);
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

//delete category
app.delete('/category/:pro',function(req,res) {
      var id = req.params.pro.toString();
      category.deleteOne({ "_id": id },function(err,result)
      {
          if(err)
          throw error
          else
          {
            console.log(result);
              res.send("data deleted SUCCESFULLY")
          }
      });
 })

// fetch select options of categories
app.get('/categoryOptions',function (req, res)  {
    category.find({status: 'Active'}, function(error,result)
    {
        if(error)
        throw error;
        else
        res.send(JSON.stringify(result));
    })
})

// render add book page
app.get('/add_book', function(req,res) {
     if(req.session.isLogin)
     {
        res.render('add_book', {data: userdata});
     }
     else
     {
        res.render('index');
     }
})

app.post('/addnewbook', function(req,res) {
     books.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else
        {
          console.log(result);
        }
      })
     res.send("data saved");
})



// logout the user and admin //
app.get('/logout_person', function(req,res) {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('index');
})

console.log("Running on port 8000");
app.listen(8000)