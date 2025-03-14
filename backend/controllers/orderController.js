const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

// @desc Create a new order
// @route POST /api/orders
// @access Admin/Manager
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, status } = req.body;

    if (!items || items.length === 0 || !totalAmount || !status) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Validate inventory stock
    for (const item of items) {
      const inventoryItem = await Inventory.findById(item.inventory);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: `Item not found: ${item.inventory}` });
      }
      if (item.quantity > inventoryItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for item: ${inventoryItem.name}`,
        });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

// @desc Get all orders with filters (by user, status, date range)
// @route GET /api/orders
// @access Admin/Manager/Employee
exports.getOrders = async (req, res) => {
  try {
    const { createdBy, status, startDate, endDate } = req.query;
    let filter = {};

    if (createdBy) {
      filter.createdBy = createdBy;
    }

    if (status) {
      filter.status = status;
    }

    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.inventory", "name price")
      .populate("createdBy", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

// @desc Get single order by ID
// @route GET /api/orders/:id
// @access Admin/Manager/Employee
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.inventory", "name price")
      .populate("createdBy", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

// @desc Update order status
// @route PUT /api/orders/:id
// @access Admin/Manager
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Admin only
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};
