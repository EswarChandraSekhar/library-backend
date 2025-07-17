const mongoose = require('mongoose');

const FoundItemSchema = new mongoose.Schema({
  fullname: String,
  mobile: String,
  email: String,
  trainNumber: String,
  trainName: String,
  coachnum: String,
  location: String,
  itemname: String,
  description: String,
  dateoffound: String,
   // ✅ Optional reference to registered user
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }
});

module.exports = mongoose.model('FoundItem', FoundItemSchema);
