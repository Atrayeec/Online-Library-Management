var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  av_status: String
});

module.exports = mongoose.model('Books', bookSchema);
