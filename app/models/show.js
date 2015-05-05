var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShowSchema = new Schema({
  venue: String,
  city: String,
  state: String,
  zipcode: String, 
  setlist: String, 
  members_attending: String,
  members_attended: String,
  date: { type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now},
  last_updated: { type: Date, default: Date.now},
  played: { type: Boolean, default: false }
});


module.exports = mongoose.model('Show', ShowSchema);