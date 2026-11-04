const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google's public DNS (8.8.8.8) for SRV lookups
// This fixes 'querySrv ECONNREFUSED' errors on some networks/ISPs
dns.setDefaultResultOrder('ipv4first');
if (dns.setServers) {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch(e) {
    // ignore if not supported
  }
}

// Direct connection string using resolved shard addresses (bypasses SRV DNS lookup)
const MONGO_URI = process.env.MONGODB_URI ||
  'mongodb://skp325407_db_user:QLmHBsKidlRzFqbv@ac-edijhpk-shard-00-00.tauumj3.mongodb.net:27017,ac-edijhpk-shard-00-01.tauumj3.mongodb.net:27017,ac-edijhpk-shard-00-02.tauumj3.mongodb.net:27017/test?ssl=true&authSource=admin&retryWrites=true&w=majority';

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Register = mongoose.model("Register", RegisterSchema, "registers");

async function main() {
  console.log("Connecting to MongoDB Atlas 'test' database...");
  console.log("Using DNS servers: 8.8.8.8 (Google) for SRV lookup\n");
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
    });
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const count = await Register.countDocuments();
    console.log(`Current records in 'registers' collection: ${count}`);

    if (count === 0) {
      await Register.create({
        name: "Admin User",
        email: "admin@tourism.com",
        password: "adminPassword123"
      });
      console.log("✅ Successfully created 'registers' collection with initial document!");
    } else {
      console.log("✅ 'registers' collection already exists in your MongoDB Atlas test database.");
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📁 Collections now present in your 'test' database:");
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log("\n🎉 Done! Go to MongoDB Atlas → Data Explorer → test → see both collections!");

  } catch (err) {
    console.error("\n❌ Could not connect to MongoDB Atlas cluster:", err.message);
    console.log("\n👉 Troubleshooting steps:");
    console.log("   1. In MongoDB Atlas, check Cluster0 shows a GREEN dot (fully running)");
    console.log("   2. If still resuming (grey/yellow), wait 3-5 minutes and retry");
    console.log("   3. Try: Go to Atlas → Cluster0 → Connect → Drivers → copy fresh connection string");
    console.log("   4. Try using mobile hotspot if your WiFi/ISP blocks SRV DNS");
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
