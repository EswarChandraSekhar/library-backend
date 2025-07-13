const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const User = require('../models/User');
const auth = require('./../middlewares/auth').auth

// GET all authors
router.get('/',  auth,  async (req, res) => {
  try {
  let user = req.user;
  let user_obj = await User.findOne({email:user.email})
    if (user_obj !== null) {
      if (user_obj.role === 'user') {
        res.status(403).json({
          status: 'fail',
          messgae: "Access Denied"
        })
        return;
      }
      const authors = await Author.find();
      res.status(200).json(authors);
    }
    else{
      res.status(400).json({message:'Invalid User'})
    }
    
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
