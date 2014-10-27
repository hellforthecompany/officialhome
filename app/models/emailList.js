var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailListSchema = new Schema({
	email: String,
	fname: String,
	lname: String,
	birthday: Date,
	found_us_via: String
});

module.exports = mongoose.model('EmailList', EmailListSchema);