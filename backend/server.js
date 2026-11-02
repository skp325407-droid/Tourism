const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

let isMongoConnected = false;

// Review Schema
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", ReviewSchema);

// MongoDB connection with fallback
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://skp325407_db_user:QLmHBsKidlRzFqbv@cluster0.tauumj3.mongodb.net/tourism?retryWrites=true&w=majority';

console.log("Attempting to connect to MongoDB...");

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 4000 // Quick timeout so server doesn't hang if Atlas cluster is offline
})
.then(() => {
  isMongoConnected = true;
  console.log("MongoDB Connected successfully!");
})
.catch(err => {
  isMongoConnected = false;
  console.warn("MongoDB connection warning:", err.message);
  console.log("Notice: Running with resilient in-memory review storage fallback so the website works smoothly.");
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    database: isMongoConnected ? "MongoDB Atlas (Connected)" : "In-Memory Fallback (Active)",
    port: PORT
  });
});

// API to get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (isMongoConnected) {
      const dbReviews = await Review.find().sort({ createdAt: -1 });
      return res.json(dbReviews);
    }
    // Fallback: return in-memory reviews sorted newest first
    res.json(inMemoryReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.json(inMemoryReviews);
  }
});

// API to store review
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
      return res.json({ message: "Review saved successfully in MongoDB!", review: newReview });
    }

    // Fallback in-memory save
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

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});