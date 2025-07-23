const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  firstName: String,
  title: String,
  description: String,
  itemType: {
    type: String,
    enum: ['found', 'lost']
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reaction', reactionSchema);
