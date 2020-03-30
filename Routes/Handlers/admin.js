let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));

var auth = require('../../MiddleWares/auth');

let adminController = require('../../Controllers/admin');

app.get('/add_category',auth.checkAdmin, function(req,res) {
        res.render('add_category', {data: req.session});
})

app.get('/manage_category',auth.checkAdmin, function(req,res) {
        res.render('manage_category', {data: req.session});
})

app.get('/add_book',auth.checkAdmin, function(req,res) {
        res.render('add_book', {data: req.session});
})

app.get('/manageBook',auth.checkAdmin, function(req,res) {
        res.render('manage_books', {data: req.session});
})

app.get('/add_author',auth.checkAdmin, function(req,res) {
        res.render('add_author', {data: req.session});
})

app.get('/manage_author',auth.checkAdmin, function(req,res) {
        res.render('manage_author', {data: req.session});
})

app.get('/add_students',auth.checkAdmin, function(req,res) {
        res.render('add_students', {data: req.session});
})
app.get('/book_issue',auth.checkAdmin, function(req,res) {
        res.render('book_issue', {data: req.session});
})

app.get('/manage_students',auth.checkAdmin,function(req,res) {
        res.render('manage_students', {data: req.session});
})

app.get('/manage_issue_books',auth.checkAdmin, function(req,res) {
        res.render('manage_issue_books', {data: req.session});
})

// controllers //

app.use('/addnewuser',auth.checkAdmin,adminController.addnewuser);

app.use('/addnewCategory',auth.checkAdmin,adminController.addnewCategory);

app.use('/showcategories',auth.checkAdmin,adminController.showcategories);

app.use('/category/:pro',auth.checkAdmin,adminController.category);

app.use('/updateCategoryDetails',auth.checkAdmin,adminController.updateCategoryDetails);

app.use('/addnewbook',auth.checkAdmin,adminController.addnewbook);

app.use('/categoryOptions',auth.checkAdmin,adminController.categoryOptions);

app.use('/authorOptions',auth.checkAdmin,adminController.authorOptions);

app.use('/addnewAuthor',auth.checkAdmin,adminController.addnewAuthor);

app.use('/checkemail',auth.checkAdmin,adminController.checkemail);

app.use('/checkid',auth.checkAdmin,adminController.checkid);

app.use('/checkcat',auth.checkAdmin,adminController.checkcat);

app.use('/checkauth',auth.checkAdmin,adminController.checkauth);

app.use('/checkisbn',auth.checkAdmin,adminController.checkisbn);

app.use('/issueNewBook',auth.checkAdmin,adminController.issueNewBook);

app.use('/checknameusingUniId',auth.checkAdmin,adminController.checknameusingUniId);

app.use('/checkbookusingIsbn',auth.checkAdmin,adminController.checkbookusingIsbn);

app.use('/showStudents',auth.checkAdmin,adminController.showStudents);

app.use('/students/:pro',auth.checkAdmin,adminController.students);

app.use('/showauthor',auth.checkAdmin,adminController.showauthor);

app.use('/author/:pro',auth.checkAdmin,adminController.author);

app.use('/showBooks',auth.checkAdmin,adminController.showBooks);

app.use('/book/:pro',auth.checkAdmin,adminController.book);

app.use('/issuedBook/:pro',auth.checkAdmin,adminController.issuedBook);

app.use('/showIssuedBooks',auth.checkAdmin,adminController.showIssuedBooks);

app.use('/updateIssuedBookDetails',auth.checkAdmin,adminController.updateIssuedBookDetails);



app.use('/totalNoofUsers',auth.checkAdmin,adminController.totalNoofUsers);

app.use('/totalNoofBooks',auth.checkAdmin,adminController.totalNoofBooks);

app.use('/totalNoofCat',auth.checkAdmin,adminController.totalNoofCat);

app.use('/totalissuedBooks',auth.checkAdmin,adminController.totalissuedBooks);

app.use('/totalNoofAuthors',auth.checkAdmin,adminController.totalNoofAuthors);

app.use('/totalissuedBooksToUser',auth.checkAdmin,adminController.totalissuedBooksToUser);

app.use('/getIssuedBookData',auth.checkAdmin,adminController.getIssuedBookData);

module.exports = app;