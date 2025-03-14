const Supplier = require("../models/Supplier");

// @desc Create a new supplier
// @route POST /api/suppliers
// @access Admin/Manager
exports.createSupplier = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address } = req.body;

    if (!name || !contactPerson || !email || !phone || !address) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const supplier = await Supplier.create({
      name,
      contactPerson,
      email,
      phone,
      address,
      createdBy: req.user.id,
    });
    res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all suppliers
// @route GET /api/suppliers
// @access Admin/Manager/Employee
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("createdBy", "name email");
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get a supplier by ID
// @route GET /api/suppliers/:id
// @access Admin/Manager/Employee
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update supplier details
// @route PUT /api/suppliers/:id
// @access Admin/Manager
exports.updateSupplier = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address } = req.body;

    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.name = name || supplier.name;
    supplier.contactPerson = contactPerson || supplier.contactPerson;
    supplier.email = email || supplier.email;
    supplier.phone = phone || supplier.phone;
    supplier.address = address || supplier.address;

    const updatedSupplier = await supplier.save();
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a supplier
// @route DELETE /api/suppliers/:id
// @access Admin only
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await supplier.deleteOne();
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
