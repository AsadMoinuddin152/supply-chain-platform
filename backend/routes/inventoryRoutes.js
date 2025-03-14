const express = require("express");
const router = express.Router();
const {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

// Create a new inventory item (Admin/Manager only)
router.post("/", auth, authorizeRoles("admin", "manager"), createInventory);

// Get all inventory items (All roles: Admin/Manager/Employee)
router.get("/", auth, getInventory);

// Get a single inventory item by ID (All roles: Admin/Manager/Employee)
router.get("/:id", auth, getInventoryById);

// Update an inventory item (Admin/Manager only)
router.put("/:id", auth, authorizeRoles("admin", "manager"), updateInventory);

// Delete an inventory item (Admin only)
router.delete("/:id", auth, authorizeRoles("admin"), deleteInventory);

module.exports = router;
