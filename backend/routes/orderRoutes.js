const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

// Create a new order — Admin, Manager
router.post("/", auth, authorizeRoles("Admin", "Manager"), createOrder);

// Get all orders with filters (createdBy, status, date range) — Admin, Manager, Employee
router.get(
  "/",
  auth,
  authorizeRoles("Admin", "Manager", "Employee"),
  getOrders
);

// Get a single order by ID — Admin, Manager, Employee
router.get(
  "/:id",
  auth,
  authorizeRoles("Admin", "Manager", "Employee"),
  getOrderById
);

// Update order status — Admin, Manager
router.put("/:id", auth, authorizeRoles("Admin", "Manager"), updateOrder);

// Delete an order — Admin only
router.delete("/:id", auth, authorizeRoles("Admin"), deleteOrder);

module.exports = router;
