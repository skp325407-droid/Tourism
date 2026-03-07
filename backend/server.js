const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns=require("dns")
const app = express();

dns.setServers(["1.1.1.1","4.4.8.8"])

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://skp325407_db_user:QLmHBsKidlRzFqbv@cluster0.tauumj3.mongodb.net/?appName=Cluster0')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Review Schema
const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String
});

const Review = mongoose.model("Review", ReviewSchema);


// API to store review
app.post('/api/reviews', async (req, res) => {

  try {
    const newReview = new Review(req.body);
    await newReview.save();

    res.json({ message: "Review saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error saving review" });
  }

});


app.listen(7000, () => {
  console.log("Server running on port 5000");
});