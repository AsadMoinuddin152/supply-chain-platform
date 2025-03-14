const express = require("express");
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all suppliers (Admin/Manager/Employee)
router.get("/", auth, getSuppliers);

// Get a single supplier by ID (Admin/Manager/Employee)
router.get("/:id", auth, getSupplierById);

// Create a new supplier (Admin/Manager only)
router.post("/", auth, authorizeRoles("admin", "manager"), createSupplier);

// Update a supplier (Admin/Manager only)
router.put("/:id", auth, authorizeRoles("admin", "manager"), updateSupplier);

// Delete a supplier (Admin only)
router.delete("/:id", auth, authorizeRoles("admin"), deleteSupplier);

module.exports = router;
