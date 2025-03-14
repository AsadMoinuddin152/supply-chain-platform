const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, "Please add the quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Please add the price"],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Please add a supplier"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please specify who added this item"],
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
