const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      authMechanism: "SCRAM-SHA-256",
      tls: true,
      retryWrites: false,
      maxIdleTimeMS: 120000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Load models
    const User = require("../models/User");
    const Supplier = require("../models/Supplier");
    const Inventory = require("../models/Inventory");
    const Order = require("../models/Order");

    // Clean all collections
    await User.deleteMany({});
    await Supplier.deleteMany({});
    await Inventory.deleteMany({});
    await Order.deleteMany({});
    console.log("All collections cleared!");

    // Ensure admin account is set up
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (!admin) {
      await User.create({
        name: "Admin User",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
        phone: "0000000000",
        isActive: true,
        loginCount: 0,
        loginHistory: [],
        createdBy: null,
      });
      console.log("Initial admin account created");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
