require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  const res = await mongoose.connection.collection('users').updateMany(
    { email: { $in: ['miraclechimdindu2008@gmail.com', 'miraclechimdindu2025@gmail.com'] } },
    { $set: { role: 'admin' } }
  );
  console.log(`Matched: ${res.matchedCount}, Modified: ${res.modifiedCount}`);
  process.exit(0);
}
run().catch(console.error);
