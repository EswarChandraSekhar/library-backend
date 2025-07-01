const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    setTimeout( async ()=>{
    const books = await Book.find();
    res.json(books);
    },2000)
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

module.exports = router;
