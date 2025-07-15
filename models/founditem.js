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
  dateoffound: String
});

module.exports = mongoose.model('FoundItem', FoundItemSchema);
