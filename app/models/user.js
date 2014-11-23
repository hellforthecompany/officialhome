var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  type: String,
  email: String,
  fname: String,
  lname: String,
  birthday: Date,
  found_us_via: String
});

module.exports = mongoose.model('User', UserSchema);