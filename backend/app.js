const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");


dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Import Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (register, login)
app.use("/api/courses", courseRoutes); // Course routes (CRUD)

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
