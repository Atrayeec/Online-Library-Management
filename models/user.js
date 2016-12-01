var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  contact_details: String
});

module.exports = mongoose.model('User', userSchema);
