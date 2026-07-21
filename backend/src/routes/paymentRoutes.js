const express = require("express");
const router = express.Router();
const { getPayments, addPayment, updatePayment, deletePayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware"); // Secure middleware

// Both GET and POST on /api/payments will require a valid JWT token now!
router.route("/").get(protect, getPayments).post(protect, addPayment);
router.route("/:id").put(protect, updatePayment).delete(protect, deletePayment);

module.exports = router;