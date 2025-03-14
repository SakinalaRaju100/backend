const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const moment = require("moment");

const taxiSchema = new mongoose.Schema(
  {
    // creastedAt: {
    //   //   type: Date,
    //   default: "moment()",
    // },
    // createdAt: "moment()",
    // a: "moment()",
    // dateTime: {
    //   type: Date,
    //   default: Date.now, // Set to current date and time
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
  },
  { strict: false, timestamps: true }
);

const Taxies = mongoose.model("Taxies", taxiSchema, "Taxies");

const passengerSchema = new mongoose.Schema(
  {
    // createdAt: {
    //   type: String,
    //   default: moment().format("YYYY-MM-DDTHH:mm:ss:00"),
    // },
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // createdAt: {
    //   type: String,
    //   default: moment().format("YYYY-MM-DDTHH:mm:ss:00"),
    // },
    // updatedAt: {
    //   type: String,
    //   default: () =>
    //     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    // },
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

router.post("/get-passengers", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  try {
    const data = await Passengers.find({
      active: true,
      updatedAt: { $gte: moment().subtract(1, "hours").toDate() }, // Filter for updatedAt within the last hour
    }).lean();
    res.status(200).send({
      success: true,
      data: data.map((el) => {
        return {
          ...el,
          createdAt: moment(el.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
          updatedAt: moment(el.updatedAt).format("YYYY-MM-DDTHH:mm:ss"),
        };
      }),
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ success: true, data: [] });
  }
});
router.post("/get-taxies", async (req, res) => {
  if (!db || db.readyState !== 1) {
    // Check if db is not connected
    await connectDB(); // Ensure the database connection is established
  }

  try {
    const data = await Taxies.find({
      active: true,
      updatedAt: { $gte: moment().subtract(1, "hours").toDate() }, // Filter for updatedAt within the last hour
    }).lean();
    res.status(200).send({
      success: true,
      data: data.map((el) => {
        return {
          ...el,
          createdAt: moment(el.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
          updatedAt: moment(el.updatedAt).format("YYYY-MM-DDTHH:mm:ss"),
        };
      }),
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ success: true, data: [] });
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
    from,
    to,
    mobile,
    members = 1,
    role = "passenger",
    active = true,
  } = req.body;
  if (!mobile || !from || !to || location.length == 0) {
    return res.status(201).send("data missing"); // Respond with the saved taxi data
  }

  try {
    const saveObj = {
      location,
      name,
      from,
      to,
      mobile,
      members,
      role,
      active,
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
    console.error("Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Operation failed", error }); // Handle errors
  }
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

    active = true,
  } = req.body;
  if (!mobile || !from || !to || location.length == 0) {
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
      active,
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
    console.error("Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Operation failed", error }); // Handle errors
  }
});

module.exports = router;
