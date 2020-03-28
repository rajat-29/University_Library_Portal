let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth = require('../../MiddleWares/auth');

let adminController = require('../../Controllers/admin');

app.get('/add_category',auth, function(req,res) {
        res.render('add_category', {data: req.session});
})

app.get('/manage_category',auth, function(req,res) {
        res.render('manage_category', {data: req.session});
})

app.get('/add_book',auth, function(req,res) {
        res.render('add_book', {data: req.session});
})

app.get('/manageBook',auth, function(req,res) {
        res.render('manage_books', {data: req.session});
})

app.get('/add_author',auth, function(req,res) {
        res.render('add_author', {data: req.session});
})

app.get('/manage_author',auth, function(req,res) {
        res.render('manage_author', {data: req.session});
})

app.get('/add_students',auth, function(req,res) {
        res.render('add_students', {data: req.session});
})
app.get('/book_issue',auth, function(req,res) {
        res.render('book_issue', {data: req.session});
})

app.get('/changePassword',auth, function(req,res) {
      res.render('changePassword', {data: req.session});
})
app.get('/manage_students',auth,function(req,res) {
        res.render('manage_students', {data: req.session});
})

app.get('/manage_issue_books',auth, function(req,res) {
        res.render('manage_issue_books', {data: req.session});
})

// controllers //

app.use('/addnewuser',auth,adminController.addnewuser);

app.use('/addnewCategory',auth,adminController.addnewCategory);

app.use('/showcategories',auth,adminController.showcategories);

app.use('/category/:pro',auth,adminController.category);

app.use('/updateCategoryDetails',auth,adminController.updateCategoryDetails);

app.use('/addnewbook',auth,adminController.addnewbook);

app.use('/categoryOptions',auth,adminController.categoryOptions);

app.use('/authorOptions',auth,adminController.authorOptions);

app.use('/addnewAuthor',auth,adminController.addnewAuthor);

app.use('/checkemail',auth,adminController.checkemail);

app.use('/checkid',auth,adminController.checkid);

app.use('/checkcat',auth,adminController.checkcat);

app.use('/checkauth',auth,adminController.checkauth);

app.use('/checkisbn',auth,adminController.checkisbn);

app.use('/issueNewBook',auth,adminController.issueNewBook);

app.use('/checknameusingUniId',auth,adminController.checknameusingUniId);

app.use('/checkbookusingIsbn',auth,adminController.checkbookusingIsbn);

app.use('/changePasswordDatabase',auth,adminController.changePasswordDatabase);

app.use('/showStudents',auth,adminController.showStudents);

app.use('/students/:pro',auth,adminController.students);

app.use('/showauthor',auth,adminController.showauthor);

app.use('/author/:pro',auth,adminController.author);

app.use('/showBooks',auth,adminController.showBooks);

app.use('/book/:pro',auth,adminController.book);

app.use('/updateBookDetails',auth,adminController.updateBookDetails);

app.use('/issuedBook/:pro',auth,adminController.issuedBook);

app.use('/showIssuedBooks',auth,adminController.showIssuedBooks);

app.use('/updateuserdetails',auth,adminController.updateuserdetails);

app.use('/logout_person',auth,adminController.logout_person);

app.use('/totalNoofUsers',auth,adminController.totalNoofUsers);

app.use('/totalNoofBooks',auth,adminController.totalNoofBooks);

app.use('/totalNoofCat',auth,adminController.totalNoofCat);

app.use('/totalissuedBooks',auth,adminController.totalissuedBooks);

app.use('/totalNoofAuthors',auth,adminController.totalNoofAuthors);

app.use('/totalissuedBooksToUser',auth,adminController.totalissuedBooksToUser);

app.use('/getAllData',auth,adminController.getAllData);

module.exports = app;