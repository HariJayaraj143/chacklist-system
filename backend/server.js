const app = require("./app"); // Import the Express app from app.js
const dotenv = require("dotenv");
const colors = require("colors");

// Load environment variables from .env file
dotenv.config();

// Set up server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green.bold);
});
