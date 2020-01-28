var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({              
    name: {
        type: String,
    },
    uniId: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    role: {
        type: String, 
    },  
    status: {
        type: String,
    },
    flag: {
        type: Number,
    }, 
})

module.exports =  mongoose.model('students', userSchema);