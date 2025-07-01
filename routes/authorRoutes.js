const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res) => {
  try {
    setTimeout(async()=>{
 const authors = await Author.find();
    res.status(200).json(authors);
    },2000)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new author
router.post('/', async (req, res) => {
  const author = new Author(req.body);
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete api
router.delete('/:id',async (req,res)=>{
  try{
    let id = req.params.id;
    const authorObj = await Author.deleteOne({id})
    res.status(200).json(authorObj)
  }
  catch(err){
  res.status(400).json({ message: err.message });
  }
})

module.exports = router;
