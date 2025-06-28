const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: Number,
  title: String,
  author: String,
  authorId: Number,
  genre: String,
  description: String,
  image_url: String
});

module.exports = mongoose.model('Book', BookSchema);
