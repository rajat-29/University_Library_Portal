var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
    name: {
    	type: String,
    },
    category: {
    	type: String,
    },
    author: {
    	type: String,
    },
    isbn: {
    	type: String,
    },
    price: {
    	type: String,
    },
})

module.exports =  mongoose.model('books', BookSchema);