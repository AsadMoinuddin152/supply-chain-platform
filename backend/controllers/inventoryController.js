const Inventory = require("../models/Inventory");

// @desc Create a new inventory item
// @route POST /api/inventory
// @access Admin/Manager
exports.createInventory = async (req, res) => {
  try {
    const { name, description, quantity, price, supplier } = req.body;

    if (!name || !description || !quantity || !price || !supplier) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const inventory = await Inventory.create({
      name,
      description,
      quantity,
      price,
      supplier,
      createdBy: req.user.id,
    });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all inventory items
// @route GET /api/inventory
// @access Admin/Manager/Employee
exports.getInventory = async (req, res) => {
  try {
    const { supplier, minQuantity, maxQuantity, minPrice, maxPrice } =
      req.query;

    // Create filter object
    let filter = {};

    if (supplier) filter.supplier = supplier;
    if (minQuantity) filter.quantity = { $gte: minQuantity };
    if (maxQuantity)
      filter.quantity = { ...filter.quantity, $lte: maxQuantity };
    if (minPrice) filter.price = { $gte: minPrice };
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

    const inventory = await Inventory.find(filter)
      .populate("supplier", "name contactPerson")
      .populate("createdBy", "name email");

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single inventory item by ID
// @route GET /api/inventory/:id
// @access Admin/Manager/Employee
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id)
      .populate("supplier", "name contactPerson")
      .populate("createdBy", "name email");

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update an inventory item
// @route PUT /api/inventory/:id
// @access Admin/Manager
exports.updateInventory = async (req, res) => {
  try {
    const { name, description, quantity, price, supplier } = req.body;

    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    inventory.name = name || inventory.name;
    inventory.description = description || inventory.description;
    inventory.quantity = quantity || inventory.quantity;
    inventory.price = price || inventory.price;
    inventory.supplier = supplier || inventory.supplier;

    const updatedInventory = await inventory.save();
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete an inventory item
// @route DELETE /api/inventory/:id
// @access Admin only
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.deleteOne();
    res.status(200).json({ message: "Inventory item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
