const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const taxiSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
  },
  { strict: false, timestamps: true }
);

const Taxies = mongoose.model("Taxies", taxiSchema, "Taxies");

const passengerSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
  },
  { strict: false, timestamps: true }
);

const Passengers = mongoose.model("Passengers", passengerSchema, "Passengers");

let db = null;

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

router.post("/get-taxies", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  const data = await Taxies.find();
  res.send(data);
});
router.post("/get-passengers", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  const data = await Passengers.find();
  res.send(data);
});
router.post("/add-taxi", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  const {
    location = [],
    name = "NA",
    seats = 1,
    from,
    to,
    mobile,
    vehicleNumber = "NA",
    role = "taxi",
  } = req.body;
  if (!mobile || !from || !to) {
    return res.status(201).send("data missing"); // Respond with the saved taxi data
  }

  try {
    const saveObj = {
      location,
      name,
      seats,
      from,
      to,
      mobile,
      vehicleNumber,
      role,
    };

    const result = await Taxies.updateOne(
      {
        mobile,
      }, // Filter to find the document
      {
        $set: {
          ...saveObj,
        },
      }, // Update this field
      { upsert: true } // If not found, create a new document
    );

    res.status(201).send({ success: true, message: "Operation successful" }); // Respond with the saved taxi data
  } catch (error) {
    console.error("Error adding taxi:", error);
    res
      .status(500)
      .send({ success: false, message: "Operation failed", error }); // Handle errors
  }
});
router.post("/add-passenger", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  const {
    location = [],
    name = "NA",
    // seats = 1,
    from,
    to,
    mobile,
    // vehicleNumber = "NA",

    members = 1,
    role = "passenger",
  } = req.body;
  if (!mobile || !from || !to) {
    return res.status(201).send("data missing"); // Respond with the saved taxi data
  }

  try {
    const saveObj = {
      location,
      name,
      //   seats,
      from,
      to,
      mobile,
      //   vehicleNumber,

      members,
      role,
    };

    const result = await Passengers.updateOne(
      {
        mobile,
      }, // Filter to find the document
      {
        $set: {
          ...saveObj,
        },
      }, // Update this field
      { upsert: true } // If not found, create a new document
    );

    res.status(201).send({ success: true, message: "Operation successful" }); // Respond with the saved taxi data
  } catch (error) {
    console.error("Error adding taxi:", error);
    res
      .status(500)
      .send({ success: false, message: "Operation failed", error }); // Handle errors
  }
});

module.exports = router;
