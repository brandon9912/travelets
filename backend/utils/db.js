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

async function getCollection(collectionName) {
  return db.connection.collection(collectionName);
}

module.exports = { connect, getCollection };
