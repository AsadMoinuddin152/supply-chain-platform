const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = require("./app");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = server; // For testing
