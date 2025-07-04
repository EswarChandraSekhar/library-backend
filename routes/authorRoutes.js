const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res) => {
  try {
   
 const authors = await Author.find();
    res.status(200).json(authors);
    
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

//edit 
router.put('/:id', async (req,res)=>{
  try{
    let id = parseInt(req.params.id);
    const selectedAuthor = await Author.findOne({id});
    if (!selectedAuthor) return res.status(404).json({ error: 'Author not found' });
    selectedAuthor.id = parseInt(req.body.id);
    selectedAuthor.image = req.body.image;
    selectedAuthor.name = req.body.name;
    selectedAuthor.dob = req.body.dob;
    selectedAuthor.nationality = req.body.nationality;
    selectedAuthor.biography = req.body.biography;
    let updatedTodo = await selectedAuthor.save()
    res.json(updatedTodo);
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to update Author' });
  }
})

module.exports = router;
