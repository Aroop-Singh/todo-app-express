const express = require("express");
const app = express();
const serverless = require("serverless-http");

app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.send("Server is healthy 🚀");
});

module.exports.handler = serverless(app);
