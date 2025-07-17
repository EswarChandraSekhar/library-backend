const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  email: { type: String, required: true }, // user's email
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
