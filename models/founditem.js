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
   images: {
    type:  [String],
    required: false,
    default: []
  },
  status: {
    type: String,
    required: true,
    default:'in-progress' // in-progress, found , not-found
  }
});

module.exports = mongoose.model('FoundItem', FoundItemSchema);
