const User = require ('../models/User');
const LostItem = require('../models/lostitem');
const FoundItem = require('../models/founditem');
const Transaction = require('../models/Transaction');

exports.getUserProfile = async (req, res) => {
  const  email  = req.user.email;

  try {
    // Step 1: Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Step 2: Ensure all lost/found items that match this email also have userRef set
    let lostItems = await LostItem.find({ email}).sort({createdAt: 1});
    let foundItems = await FoundItem.find({ email}).sort({createdAt: 1});

    //const transactions = await Transaction.find({ email: user.email });

    // Step 4: Send final response
    res.json({
      user: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        role: user.role,
        joined: user.createdAt,
      },
      lostItems,
      foundItems,
    });
  } catch (err) {
    console.error('Error loading user profile:', err);
    res.status(500).json({ error: 'Failed to load user profile' });
  }
};
