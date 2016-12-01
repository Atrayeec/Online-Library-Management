var mongoose = require('mongoose');

var adminuserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  contact_details: String
});

module.exports = mongoose.model('Admin_user', adminuserSchema);
