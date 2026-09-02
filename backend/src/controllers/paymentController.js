const Transaction = require("../models/transaction");

// @desc    Get all transactions for logged in user
// @route   GET /api/payments
const getPayments = async (req, res) => {
  try {
    // req.user.id comes straight from our auth middleware!
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new transaction
// @route   POST /api/payments
// Example inside addPayment
const addPayment = async (req, res) => {
  const { title, amount, type, category, date } = req.body;

  try {
    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date: date ? new Date(date) : Date.now(), // Accepts custom dates
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create entry", error: error.message });
  }
};
// @desc    Update a transaction
// @route   PUT /api/payments/:id
const updatePayment = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Make sure the transaction belongs to the logged-in user
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to update this transaction" });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/payments/:id
const deletePayment = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Make sure the transaction belongs to the logged-in user
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this transaction" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getPayments, addPayment, updatePayment, deletePayment };