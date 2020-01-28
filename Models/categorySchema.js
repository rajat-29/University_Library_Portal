var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
    name: {
    	type: String,
    },
    status: {
    	type: String,
    },
    createDate: {
    	type: String,
    },
})

module.exports =  mongoose.model('categories', categorySchema);