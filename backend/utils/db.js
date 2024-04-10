const db = require("mongoose");

async function connect() {
  try {
    await db.connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB: ", error);
  }
}

module.exports = { connect };
