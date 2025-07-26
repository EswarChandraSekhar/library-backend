const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  fullnameofuser: String,
  mobile: String,
  email: String,
  trainNumber: String,
  trainName: String,
  coachnum: String,
  seatnum: String,
  itemname: String,
  dateoflost: String,
  description: String,
  proof: String,
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
}, { timestamps: true });


module.exports = mongoose.model('LostItem', LostItemSchema);
