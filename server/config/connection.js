const mongoose = require("mongoose");
require("dotenv").config(); // Make sure this is included

//checks if .env file variables are loaded correctly
if (!process.env.DB_URI || !process.env.NEW_DB_URI) {
  console.error("missing DB_URI or missing NEW_DB_URI in .env file");
  process.exit(1);
}

//Connect to the original database (MongoDB Atlas)
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

//Connect to the new user database (Local MongoDB)
const productDB = mongoose.createConnection(process.env.NEW_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

productDB.on("connected", () => {
  console.log("Connected to New DB")
});

productDB.on("error", (err) => {
  console.error("error connecting to New Product DB:", err.message);
});

//call function to connect to the original database
connectToDB();

module.exports = { originalDB: mongoose.connection, productDB };

