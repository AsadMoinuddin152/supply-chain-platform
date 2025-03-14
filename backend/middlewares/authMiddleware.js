const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token payload
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const lowerCaseRoles = roles.map((role) => role.toLowerCase());
    if (!lowerCaseRoles.includes(req.user.role.toLowerCase())) {
      return res.status(403).json({
        userRole: req.user.role,
        requiredRoles: lowerCaseRoles,
        message: "Not authorized for this role",
      });
    }
    next();
  };
};
