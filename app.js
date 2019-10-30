var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var mongodb = require('mongodb');
var mongoStore = require('connect-mongo')(session);
var mailer = require('nodemailer');
var MongoDataTable = require('mongo-datatable');
ObjectId = require('mongodb').ObjectID;
var MongoClient = mongodb.MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public'))) /*folder path*/

var mongoose = require('mongoose');						/*include mongo*/
var mongoDB = 'mongodb://localhost/libraryManagement';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB,{ useNewUrlParser: true});

var db = mongoose.connection;

app.use(express.urlencoded({extended: true}))
app.use(express.json())                 /*include express*/
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: false,
    clear_interval: 900,
    store : new mongoStore({mongooseConnection:db}),
    autoRemove: 'native',
    cookie: {maxAge: 3000000}
}))

mongoose.connection.on('error',(err) => {					/*database connect*/
    console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    console.log('DB connected');
})

// Routing the routes //
app.use('/login',require('./Routes/login'));
app.use('/admin',require('./Routes/admin'));
app.use('/user',require('./Routes/user'));

console.log("Running on port 8000");
app.listen(8000)