const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  lostId: { type: mongoose.Schema.Types.ObjectId, ref: 'LostItem' },
  foundId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoundItem' },
  confidence: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
