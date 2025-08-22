const express = require("express");
const app = express();
const serverless = require("serverless-http");
const path = require("path");

app.use(express.static("pblic"));

// 👇 Add this route just after the middleware
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/health", (req, res) => {
  res.send("Server is healthy 🚀");
});

module.exports.handler = serverless(app);
