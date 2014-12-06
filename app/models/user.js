var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: { type: String, default: '' },
  type: String,
  fname: String,
  lname: String,
  birthday: Date
});

module.exports = mongoose.model('User', UserSchema);