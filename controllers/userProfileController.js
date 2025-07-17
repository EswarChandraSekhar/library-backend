const User = require('../models/User');
const LostItem = require('../models/lostitem');
const FoundItem = require('../models/founditem');
const Transaction = require('../models/Transaction');

exports.getUserProfile = async (req, res) => {
  const { email } = req.query;

  try {
    // Step 1: Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Step 2: Ensure all lost/found items that match this email also have userRef set
    await LostItem.updateMany(
      { email: user.email, $or: [{ userRef: { $exists: false } }, { userRef: null }] },
      { $set: { userRef: user._id } }
    );

    await FoundItem.updateMany(
      { email: user.email, $or: [{ userRef: { $exists: false } }, { userRef: null }] },
      { $set: { userRef: user._id } }
    );

    // Step 3: Now reliably fetch based on userRef (not email)
    const lostItems = await LostItem.find({ userRef: user._id });
    const foundItems = await FoundItem.find({ userRef: user._id });
    const transactions = await Transaction.find({ email: user.email }); // Still by email for now

    // Step 4: Send final response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        joined: user.createdAt,
      },
      lostItems,
      foundItems,
      transactions,
    });
  } catch (err) {
    console.error('Error loading user profile:', err);
    res.status(500).json({ error: 'Failed to load user profile' });
  }
};
