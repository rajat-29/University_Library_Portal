var app = require('express').Router();

app.use('/login',require('./Handlers/login.js'));
app.use('/admin',require('./Handlers/admin.js'));
app.use('/user',require('./Handlers/user.js'));

module.exports = app;