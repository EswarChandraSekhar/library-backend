const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phoneNumber: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  role: {type: String, required: true, default: 'user'}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
