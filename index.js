const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

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
