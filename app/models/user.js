var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: { type: String, default: '' },
  type: { type: String, default: '' },
  fname: { type: String, default: '' },
  lname: { type: String, default: '' },
  birthday: Date
});

/*
UserSchema.pre("save",function(next, done) {
			    var self = this;
			    mongoose.models["User"].findOne({email : self.email},function(err, user) {
			        if(err) {
			            done(err);
			        } else if(user) {
			            self.invalidate("email","email must be unique");
			            done(new Error("email must be unique"));
			        } else {
			            done();
			        }
			    });
			    res.render('index');

});
*/

module.exports = mongoose.model('User', UserSchema);