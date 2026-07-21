const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (Format: "Bearer <token_string>")
      token = req.headers.authorization.split(" ")[1];

      // Verify token authenticity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database (minus password string) and attach to request
      req.user = await User.findById(decoded.id).select("-password");

      // Move to the next controller/route handler
      return next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };