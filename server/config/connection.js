const mongoose = require("mongoose");
require("dotenv").config();


async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB", conn);
  } catch (err) {
    console.log(err);
  }
}
connectToDB();


module.exports = mongoose.connection;
