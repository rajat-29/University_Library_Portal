var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
    name: String,
    category: String,
    author: String,
    isbn: String,
    price: String,
})

module.exports =  mongoose.model('books', BookSchema);