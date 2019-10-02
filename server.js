const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Setup enviroment for static path
if (process.env.ENVIRONMENT === "development") {
  // Dev route
  console.log("Development env");
  app.use(express.static(path.join(__dirname, "client")));
} else if (process.env.ENVIRONMENT === "production") {
  // Build route
  app.use(express.static(path.join(__dirname, "client", "build")));
}
