const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  dob: Date,
  nationality: String,
  image: String,
  biography: String
});

module.exports = mongoose.model('Author', AuthorSchema);
