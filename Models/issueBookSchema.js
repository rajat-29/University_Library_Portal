var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueBookSchema = new mongoose.Schema({
    isbn: String,
    uniId: String,
    ReturnDate: String,
    studentName: String,
    bookName: String,
    fine: String,
})

module.exports = mongoose.model('issueBookes', issueBookSchema);