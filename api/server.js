const express = require("express");
const app = express();
const serverless = require("serverless-http");
const path = require("path");

app.use(express.static("public"));
