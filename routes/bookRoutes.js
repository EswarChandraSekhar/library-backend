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

// DELETE book by bookId
router.delete('/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId); // assuming bookId is a number
  try {
    const deletedBook = await Book.findOneAndDelete({ bookId });
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//edit book
router.put('/:bookId', async (req, res) => {
  try {
    let bookId = parseInt(req.params.bookId);
    const selectedBook = await Book.findOne({ bookId });
    if (!selectedBook) return res.status(404).json({ error: 'Book not found' });

    selectedBook.title = req.body.title;
    selectedBook.author = req.body.author;
    selectedBook.authorId = req.body.authorId;
    selectedBook.genre = req.body.genre;
    selectedBook.description = req.body.description;
    selectedBook.image_url = req.body.image_url;
    selectedBook.bookId = req.body.bookId;

    let updatedBook = await selectedBook.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});



module.exports = router;
