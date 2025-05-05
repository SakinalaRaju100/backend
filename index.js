const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");

const multer = require("multer");
const fs = require("fs");
const { put } = require("@vercel/blob");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "files")));

// Basic route
app.get("/test", (req, res) => {
  res.json({ message: "Welcome to test route" });
});

app.use("/api/taxi", require("./controllers/taxi"));
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Digital world" });
//   // res.sendFile(__dirname + "/files/taxi.html");
// });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/files/appointment.html");
});
app.get("/app", (req, res) => {
  res.sendFile(__dirname + "/files/appointment.html");
});
app.get("/kunur", (req, res) => {
  res.sendFile(__dirname + "/files/chittiLoans.html");
});
app.get("/taxi", (req, res) => {
  res.sendFile(__dirname + "/files/taxi.html");
});
app.get("/mg", (req, res) => {
  res.sendFile(__dirname + "/files/Grocery.html");
});
app.get("/goldnoon", (req, res) => {
  res.sendFile(__dirname + "/files/gn.html");
});

app.get("/appointment", (req, res) => {
  res.sendFile(__dirname + "/files/appointment.html");
});

app.get("/anil", (req, res) => {
  res.sendFile(__dirname + "/files/printBill.html");
});
app.get("/slves", (req, res) => {
  res.sendFile(__dirname + "/files/slves.html");
});

// uploads folder
// app.use("/dharavi/uploads", express.static("uploads"));

// Import routes

// API routes
// app.use("/dharavi/api", require("./routes/index"));

// const BLOB_API = "https://blob.vercel-storage.com";
// const BLOB_READ_WRITE_TOKEN =
//   "vercel_blob_rw_rVjJwbcVRINVDGxq_DfDbbDevayXXXCtPbFybk7v8XVDecA";

// app.post("/uploadToBlob", async (req, res) => {
//   console.log("req.body", req.body);
//   try {
//     const { filename, contentType } = req.body;

//     // Step 1: Get upload URL from Vercel Blob
//     const { data: blobResponse } = await axios.post(
//       `${BLOB_API}/upload`,
//       {
//         filename,
//         contentType,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${BLOB_READ_WRITE_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("blobResponse", blobResponse);
//     res.json(blobResponse); // send back URL and upload fields
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ err, message: "Upload URL fetch failed" });
//   }
// });

// // const { put } = require("@vercel/blob");

// app.post("/generate-upload-url", async (req, res) => {
//   try {
//     const { filename, contentType } = req.body;

//     const { url } = await put(filename, {
//       access: "public",
//       token: BLOB_READ_WRITE_TOKEN,
//       contentType,
//       // body: Buffer.from(fileContent, "base64"),
//     });

//     res.json({ uploadUrl: url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error generating upload URL");
//   }
// });

// const upload = multer({ dest: "uploads/" }); // Temporary local storage

// app.post("/blod-upload", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const fileStream = fs.createReadStream(filePath);

//     const blob = await put(req.file.originalname, fileStream, {
//       access: "public", // or 'private'
//       token: BLOB_READ_WRITE_TOKEN,
//     });

//     // Clean up temp file
//     fs.unlinkSync(filePath);

//     res.status(200).json({ url: blob.url });
//   } catch (err) {
//     console.error("Upload failed:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
});
// Start server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err);
  process.exit(1);
});
