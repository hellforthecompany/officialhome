var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  content: String,
  created_at: { type: Date, default: Date.now},
  last_updated: { type: Date, default: Date.now},
  update_id: Number
});


module.exports = mongoose.model('Post', PostSchema);