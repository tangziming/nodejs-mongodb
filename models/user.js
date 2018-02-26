var mongoose = require('mongoose');

var userschemas = require('../schemas/users');

module.exports = mongoose.model('User',userschemas);

