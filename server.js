require('dns').setServers(['8.8.8.8', '8.8.4.4']); // Use Google Public DNS

const inquiryRoutes = require("./routes/inquiryRoutes");
const User = require("./models/User");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

const connectDB = require("./config/db");

const Property = require("./models/Property");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
const app = express();

// Middleware
app.use(cors());


app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use(
  "/api/properties",
  require("./routes/propertyRoutes")
);

app.use("/api/protected", require("./routes/protectedRoutes"));

app.use(
  "/api/inquiries",
  inquiryRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

// Simple Home Route
app.get("/", (req, res) => {
  res.send("Real Estate Backend Running");
});

app.get("/test", (req, res) => {
  res.send("Test Route Working");
});


// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});