// routes/userRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// No auth middleware here
router.post("/login", loginUser);

// Auth-protected routes
router.post("/register", auth, authorizeRoles("admin"), registerUser);
router.get("/", auth, authorizeRoles("admin"), getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, authorizeRoles("admin"), deleteUser);

module.exports = router;
