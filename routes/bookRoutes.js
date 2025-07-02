const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');


// GET all books
router.get('/', async (req, res) => {
  try {
   
    const books = await Book.find();
    res.json(books);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET Book Detail by bookId
router.get('/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId); // convert string to number if stored as number

  try {
    
    setTimeout(async () => {
      const book = await Book.findOne({ bookId });
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      // Optionally fetch author info
      const author = await Author.findOne({ id: book.authorId });
      res.json({
        ...book.toObject(),
        authorDetails: author || null
      });
    }, 2000)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
