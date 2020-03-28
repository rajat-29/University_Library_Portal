var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var http = require('http');
var server = http.Server(app);
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;

require("dotenv").config();

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')))

var mongoose = require("mongoose");
var db = mongoose.connection;

app.use(express.urlencoded({extended: true}))
app.use(express.json())                
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
      mongooseConnection: db
    })
}))

// DB //
require("./config/db");

app.use('/',require('./Routes/'));

app.get('/', function(req,res) {
  res.render('login');
})

server.listen(port, () => {
	console.log('Running on port ' +port);
});