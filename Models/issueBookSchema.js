var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueBookSchema = new mongoose.Schema({
    isbn: {
    	type: String,
    },
    uniId: {
    	type: String,
    },
    ReturnDate: {
    	type: String,
    },
    studentName: {
    	type: String,
    },
    bookName: {
    	type: String,
    },
    fine: {
    	type: String,
    },
})

module.exports = mongoose.model('issueBookes', issueBookSchema);