const express = require('express');
const router = express.Router();
const Reaction = require('../models/Reaction');

// GET - All reactions (optional but helpful)
router.get('/', async (req, res) => {
  try {
    const allReactions = await Reaction.find();
    res.json(allReactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all reactions' });
  }
});


// POST - Submit a new reaction (pending by default)
router.post('/', async (req, res) => {
  try {
    const newReaction = new Reaction(req.body);
    const saved = await newReaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error saving reaction', error: err });
  }
});
// GET - Only approved reactions
router.get('/approved', async (req, res) => {
  try {
    const approvedReactions = await Reaction.find({ status: 'approved' });
    res.json(approvedReactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching approved reactions' });
  }
});



// PUT - Approve a reaction
router.put('/:id/approve', async (req, res) => {
  try {
    const updated = await Reaction.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Approval failed' });
  }
});

// DELETE reaction 
router.delete('/:id', async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json({ message: 'Reaction deleted successfully', deletedReaction });
  } catch (error) {
    console.error('Error deleting reaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
