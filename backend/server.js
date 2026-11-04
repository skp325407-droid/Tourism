const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Force Google DNS (8.8.8.8) for MongoDB Atlas SRV lookups
// Fixes 'querySrv ECONNREFUSED' on some Windows networks/ISPs
dns.setDefaultResultOrder('ipv4first');
try { dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); } catch(e) {}

const app = express();
const PORT = process.env.PORT || 7000;

// Enable Cross-Origin Resource Sharing and JSON body parsing
app.use(cors());
app.use(express.json());

// In-memory fallback review storage (ensures reviews work even if MongoDB Atlas cluster is offline/paused)
let inMemoryReviews = [
  {
    _id: "demo-1",
    name: "Arun Kumar",
    rating: 5,
    comment: "Incredible website! Loved the detailed maps and resort links for Tamil Nadu and Kerala.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-2",
    name: "Pooja Sharma",
    rating: 5,
    comment: "Very easy to navigate and find scenic tourist destinations across all Indian states.",
    createdAt: new Date().toISOString()
  }
];

// In-memory fallback registration storage
let inMemoryRegisters = [
  {
    _id: "reg-demo",
    name: "Demo Traveler",
    email: "demo@tourism.com",
    password: "password123",
    createdAt: new Date().toISOString()
  }
];

let isMongoConnected = false;

// ==========================================
// 1. Mongoose Schemas & Models (test database)
// ==========================================

// Review Schema -> stores in 'reviews' collection
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", ReviewSchema, "reviews");

// Register Schema -> stores specifically in 'registers' collection inside 'test' database
const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Register = mongoose.model("Register", RegisterSchema, "registers");

// ==========================================
// 2. MongoDB Connection (Target: 'test' DB)
// ==========================================
// Direct connection string using resolved shard addresses (bypasses SRV DNS lookup)
// SRV record resolved: ac-edijhpk-shard-00-00/01/02.tauumj3.mongodb.net port 27017
const MONGO_URI = process.env.MONGODB_URI ||
  'mongodb://skp325407_db_user:QLmHBsKidlRzFqbv@ac-edijhpk-shard-00-00.tauumj3.mongodb.net:27017,ac-edijhpk-shard-00-01.tauumj3.mongodb.net:27017,ac-edijhpk-shard-00-02.tauumj3.mongodb.net:27017/test?ssl=true&authSource=admin&retryWrites=true&w=majority';

console.log("Connecting to MongoDB Atlas 'test' database...");

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000
})
.then(async () => {
  isMongoConnected = true;
  console.log("✅ MongoDB Connected successfully to 'test' database!");

  // Ensure 'registers' collection exists in MongoDB Atlas by inserting initial document if empty
  try {
    const regCount = await Register.countDocuments();
    if (regCount === 0) {
      await Register.create({
        name: "Demo Traveler",
        email: "demo@tourism.com",
        password: "password123"
      });
      console.log("✅ Created 'registers' collection with initial record in MongoDB Atlas!");
    } else {
      console.log(`ℹ️ 'registers' collection found with ${regCount} existing records.`);
    }
  } catch (initErr) {
    console.warn("Notice checking registers collection:", initErr.message);
  }
})
.catch(err => {
  isMongoConnected = false;
  console.warn("⚠️ MongoDB Atlas connection warning:", err.message);
  console.log("💡 Tip: If your cluster is paused in Atlas, click the green 'Resume' button in MongoDB Atlas.");
  console.log("Notice: In-memory fallback active so registration, login & reviews continue working locally.");
});

// ==========================================
// 3. API Endpoints
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    database: isMongoConnected ? "MongoDB Atlas - 'test' DB (Connected)" : "In-Memory Fallback (Active)",
    collections: ["registers", "reviews"],
    targetDatabase: "test",
    port: PORT
  });
});

// ------------------------------------------
// User Registration & Authentication Routes
// ------------------------------------------

// POST /api/register - Register a new user and save into 'registers' collection
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  try {
    if (isMongoConnected) {
      // Check if email already registered in 'registers' collection
      const existingUser = await Register.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email already exists. Please sign in." });
      }

      // Insert new document into 'registers' collection
      const newRegister = new Register({
        name: cleanName,
        email: cleanEmail,
        password: password
      });

      await newRegister.save();

      return res.status(201).json({
        message: "Registration successful in MongoDB 'test' database ('registers' collection)!",
        user: { id: newRegister._id, name: newRegister.name, email: newRegister.email }
      });
    }

    // Fallback: in-memory registration
    const existing = inMemoryRegisters.find(u => u.email === cleanEmail);
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists. Please sign in." });
    }

    const fallbackUser = {
      _id: "reg-" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };
    inMemoryRegisters.push(fallbackUser);

    res.status(201).json({
      message: "Registration successful!",
      user: { id: fallbackUser._id, name: fallbackUser.name, email: fallbackUser.email }
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// POST /api/login - Authenticate registered user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter both email and password." });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    if (isMongoConnected) {
      const user = await Register.findOne({ email: cleanEmail, password: password });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      return res.json({
        message: "Login successful!",
        user: { id: user._id, name: user.name, email: user.email }
      });
    }

    // Fallback in-memory login
    const user = inMemoryRegisters.find(u => u.email === cleanEmail && u.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error during login", error: error.message });
  }
});

// GET /api/users or /api/registers - View registered entries
app.get(['/api/users', '/api/registers'], async (req, res) => {
  try {
    if (isMongoConnected) {
      const records = await Register.find({}, { password: 0 }).sort({ createdAt: -1 });
      return res.json(records);
    }
    res.json(inMemoryRegisters.map(({ password, ...u }) => u));
  } catch (error) {
    res.status(500).json({ message: "Error fetching registered users" });
  }
});

// ------------------------------------------
// Review Routes (reviews collection)
// ------------------------------------------

// GET /api/reviews - Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (isMongoConnected) {
      const dbReviews = await Review.find().sort({ createdAt: -1 });
      return res.json(dbReviews);
    }
    res.json(inMemoryReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.json(inMemoryReviews);
  }
});

// POST /api/reviews - Save a review into 'reviews' collection
app.post('/api/reviews', async (req, res) => {
  const { name, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({ message: "Name, rating, and comment are required." });
  }

  try {
    if (isMongoConnected) {
      const newReview = new Review({
        name,
        rating: Number(rating),
        comment
      });
      await newReview.save();
      return res.json({ message: "Review saved successfully in MongoDB 'test' database!", review: newReview });
    }

    const fallbackReview = {
      _id: "rev-" + Date.now(),
      name,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };
    inMemoryReviews.unshift(fallbackReview);

    res.json({ message: "Review saved successfully!", review: fallbackReview });

  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Error saving review", error: error.message });
  }
});

// Start Express Server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
