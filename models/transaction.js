var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  username: String,
  bookname: String,
  type: String,
  due_date:Date
});

module.exports = mongoose.model('transaction_detail', transactionSchema);
