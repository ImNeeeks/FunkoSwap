const mongoose = require("mongoose");
require("dotenv").config(); // Make sure this is included

async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB", conn.connection.host);
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}

connectToDB();

module.exports = mongoose.connection;

