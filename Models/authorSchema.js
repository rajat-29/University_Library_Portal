var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new mongoose.Schema({
    name: {
    	type: String,
    },
})

module.exports = mongoose.model('authors', authorSchema);