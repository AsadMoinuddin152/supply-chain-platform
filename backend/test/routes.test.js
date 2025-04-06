const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../app"); // Assuming server.js is the entry point
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

let token;
let supplierId;
const logFilePath = path.join(__dirname, "test_failures.log");

// Utility function to log failed test cases
function logFailure(route, testCase, response) {
  const logMessage = `
  ========================
  Route: ${route}
  Test Case: ${testCase}
  Status Code: ${response?.status || "Unknown"}
  Response Body: ${
    response?.body ? JSON.stringify(response.body, null, 2) : "No response body"
  }
  ========================
  `;
  fs.appendFileSync(logFilePath, logMessage);
}

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const res = await request(app).post("/api/users/login").send({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  if (!res.body.token) {
    throw new Error("Failed to retrieve admin token. Check login credentials.");
  }

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("User Routes", () => {
  it("should log in an admin", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    try {
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    } catch (err) {
      logFailure("User Routes", "should log in an admin", res);
      throw err;
    }
  });

  it("should create a new user (Admin only)", async () => {
    await User.deleteOne({ email: "testuser@example.com" });
    const res = await request(app)
      .post("/api/users/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        role: "manager",
      });

    try {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "Test User");
    } catch (err) {
      logFailure("User Routes", "should create a new user (Admin only)", res);
      throw err;
    }
  });

  it("should get all users (Admin only)", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    } catch (err) {
      logFailure("User Routes", "should get all users (Admin only)", res);
      throw err;
    }
  });
});

describe("Supplier Routes", () => {
  it("should create a supplier (Admin/Manager)", async () => {
    const res = await request(app)
      .post("/api/suppliers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Supplier",
        contactPerson: "John Doe",
        email: "supplier@example.com",
        phone: "1234567890",
        address: "123 Main Street, Springfield, IL, 62704",
      });

    try {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "Test Supplier");
      supplierId = res.body._id;
    } catch (err) {
      logFailure(
        "Supplier Routes",
        "should create a supplier (Admin/Manager)",
        res
      );
      throw err;
    }
  });

  it("should get all suppliers", async () => {
    const res = await request(app)
      .get("/api/suppliers")
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    } catch (err) {
      logFailure("Supplier Routes", "should get all suppliers", res);
      throw err;
    }
  });

  it("should delete a supplier (Admin only)", async () => {
    if (!supplierId) {
      throw new Error("supplierId is undefined");
    }

    const res = await request(app)
      .delete(`/api/suppliers/${supplierId}`)
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
    } catch (err) {
      logFailure(
        "Supplier Routes",
        "should delete a supplier (Admin only)",
        res
      );
      throw err;
    }
  });
});

describe("Inventory Routes", () => {
  let inventoryId;
  let supplierId;

  beforeAll(async () => {
    const supplierRes = await request(app)
      .post("/api/suppliers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Inventory Test Supplier",
        contactPerson: "Jane Doe",
        email: "inventorysupplier@example.com",
        phone: "9876543210",
        address: "123 Main Street, Springfield, IL, 62704",
      });
    if (supplierRes.statusCode !== 201) {
      throw new Error("Failed to create supplier for inventory tests");
    }

    supplierId = supplierRes.body._id;
  });

  it("should create an inventory item (Admin/Manager)", async () => {
    const res = await request(app)
      .post("/api/inventory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Item",
        description: "Sample description",
        quantity: 100,
        price: 50,
        supplier: supplierId,
      });

    try {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "Test Item");
      inventoryId = res.body._id;
    } catch (err) {
      logFailure(
        "Inventory Routes",
        "should create an inventory item (Admin/Manager)",
        res
      );
      throw err;
    }
  });

  it("should get all inventory items", async () => {
    const res = await request(app)
      .get("/api/inventory")
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    } catch (err) {
      logFailure("Inventory Routes", "should get all inventory items", res);
      throw err;
    }
  });

  it("should delete an inventory item (Admin only)", async () => {
    if (!inventoryId) {
      throw new Error("inventoryId is undefined");
    }

    const res = await request(app)
      .delete(`/api/inventory/${inventoryId}`)
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
    } catch (err) {
      logFailure(
        "Inventory Routes",
        "should delete an inventory item (Admin only)",
        res
      );
      throw err;
    }
  });

  afterAll(async () => {
    if (supplierId) {
      await request(app)
        .delete(`/api/suppliers/${supplierId}`)
        .set("Authorization", `Bearer ${token}`);
    }
  });
});

describe("Order Routes", () => {
  let orderId;
  let inventoryId;

  beforeAll(async () => {
    const inventoryRes = await request(app)
      .post("/api/inventory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Item",
        description: "Sample description",
        quantity: 100,
        price: 50,
        supplier: supplierId,
      });

    if (inventoryRes.statusCode !== 201) {
      throw new Error("Failed to create inventory for order tests");
    }
    inventoryId = inventoryRes.body._id;
  });

  it("should create an order (Admin/Manager)", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          {
            inventory: inventoryId,
            quantity: 2,
            price: 100,
          },
        ],
        totalAmount: 200,
        status: "Pending",
      });

    try {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status", "Pending");
      orderId = res.body._id; // Ensure orderId is correctly set
    } catch (err) {
      logFailure("Order Routes", "should create an order (Admin/Manager)", res);
      throw err;
    }
  });

  it("should get all orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    } catch (err) {
      logFailure("Order Routes", "should get all orders", res);
      throw err;
    }
  });

  it("should delete an order (Admin only)", async () => {
    if (!orderId) {
      throw new Error("orderId is undefined");
    }

    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    try {
      expect(res.statusCode).toBe(200);
    } catch (err) {
      logFailure("Order Routes", "should delete an order (Admin only)", res);
      throw err;
    }
  });
});
