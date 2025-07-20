// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from "public" folder
app.use(express.static("public"));

// Optional: handle a GET route
app.get("/health", (req, res) => {
  res.send("Server is healthy 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
