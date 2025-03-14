const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

let db = null;

// const connectDB = () => {
//   try {
//     mongoose.connect(
//       "mongodb+srv://sakinalaraju100:ObBamLOL3fm9X16z@cluster0.4bvgg.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0?tls=true",
//       {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//         connectTimeoutMS: 30000,
//       }
//     );

//     db = mongoose.connection;
//     if (db) {
//       db.on("error", console.error.bind(console, "connection error:"));
//       db.once("open", () => {
//         console.log("Connected to MongoDB");
//       });
//     }
//   } catch (er) {
//     console.log("er", er);
//   }
// };

const connectDB = () => {
  return new Promise((resolve, reject) => {
    // Return a promise
    try {
      mongoose.connect(
        "mongodb+srv://sakinalaraju100:ObBamLOL3fm9X16z@cluster0.4bvgg.mongodb.net/taxi?retryWrites=true&w=majority&appName=Cluster0?tls=true",
        {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          connectTimeoutMS: 30000,
        }
      );

      db = mongoose.connection;
      if (db) {
        db.on("error", (error) => {
          console.error("connection error:", error);
          reject(error); // Reject the promise on error
        });
        db.once("open", () => {
          console.log("Connected to MongoDB");
          resolve(); // Resolve the promise when connected
        });
      }
    } catch (er) {
      db = null;
      console.log("er", er);
      reject(er); // Reject the promise on exception
    }
  });
};

router.get("/", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }
  const collection = db.collection("taxies"); // Replace with your collection name
  const data = await collection.find({}).toArray();
  res.send(data);
});

module.exports = router;
