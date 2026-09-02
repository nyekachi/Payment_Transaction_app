const User = require("../models/user");
const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");

// Helper function to generate JWT tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Auto-seed starter bank transactions for new accounts
const seedStarterTransactions = async (userId) => {
  const starterRecords = [
    {
      user: userId,
      title: "Royal Blossom Dividend",
      amount: 520.0,
      type: "income",
      category: "Nectar & Honey 🍯",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      user: userId,
      title: "Cobweb Wi-Fi Network Fee",
      amount: 28.5,
      type: "expense",
      category: "Dewdrops 💧",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      user: userId,
      title: "Glow-worm Lantern Utility",
      amount: 14.2,
      type: "expense",
      category: "Moonlight Charms 🌙",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      user: userId,
      title: "Dragon Armor Polish & Scales",
      amount: 45.0,
      type: "expense",
      category: "Dragon Scales 🐉",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      user: userId,
      title: "Forest Foraging Stipend",
      amount: 185.0,
      type: "income",
      category: "Acorns & Seeds 🌰",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      user: userId,
      title: "Wand Polish & Maintenance",
      amount: 22.0,
      type: "expense",
      category: "Pixie Dust ✨",
      date: new Date(),
    },
  ];

  await Transaction.insertMany(starterRecords);
};

// @desc    Register new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    // Seed default bank transactions immediately upon registration
    await seedStarterTransactions(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };