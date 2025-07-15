const express = require('express');
const router = express.Router();
const FoundItem = require('../models/founditem');

// GET all found items
router.get('/', async (req, res) => {
  try {
    const items = await FoundItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new found item
router.post('/', async (req, res) => {
     console.log("Received data:", req.body);
  const foundItem = new FoundItem(req.body);
  try {
    const newItem = await foundItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET found item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Found item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE found item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await FoundItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }
    res.json({ message: 'Found item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) found item by ID
router.put('/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Found item not found' });

    item.fullname = req.body.fullname;
    item.mobile = req.body.mobile;
    item.email = req.body.email;
    item.trainNumber = req.body.trainNumber;
    item.trainName = req.body.trainName;
    item.coachnum = req.body.coachnum;
    item.location = req.body.location;
    item.itemname = req.body.itemname;
    item.description = req.body.description;
    item.dateoffound = req.body.dateoffound;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update found item' });
  }
});

module.exports = router;
