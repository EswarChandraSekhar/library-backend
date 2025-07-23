const express = require('express');
const router = express.Router();
const LostItem = require('../models/lostitem');
const User = require('../models/User');
const auth = require('./../middlewares/auth').auth
const { storage} = require('./../middlewares/imageStorage')
const multer = require('multer')
const upload = multer({storage})

// GET all lost items
router.get('/', auth,  async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new lost item
router.post('/', auth, upload.array('images',5), async (req, res) => {
  const lostItem = new LostItem(req.body);
  try {
  let image_list = []
  for(let file of req.files){
     image_list.push(file.path)
  }
  lostItem.images = image_list;
    const newItem = await lostItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET lost item by ID (MongoDB _id)
router.get('/:id', auth,  async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE lost item by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findOne({email: req.user.email})
    if(user ===null){ return res.status(400).json({message:"Invalid User!"})}
    if(user.role === 'user'){ return res.status(403).json({message:"Access Denied!"})}
    const deletedItem = await LostItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.json({ message: 'Lost item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) lost item by ID
router.put('/:id', auth,  async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Lost item not found' });

    item.fullnameofuser = req.body.fullnameofuser;
    item.mobile = req.body.mobile;
    item.email = req.body.email;
    item.trainNumber = req.body.trainNumber;
    item.trainName = req.body.trainName;
    item.coachnum = req.body.coachnum;
    item.seatnum = req.body.seatnum;
    item.itemname = req.body.itemname;
    item.dateoflost = req.body.dateoflost;
    item.description = req.body.description;
    item.proof = req.body.proof;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update lost item' });
  }
});

module.exports = router;
