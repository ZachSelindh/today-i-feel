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
  console.log("Server is operating in a development enviroment");
  app.use(express.static(path.join(__dirname, "client")));
} else if (process.env.ENVIRONMENT === "production") {
  // Build route
  app.use(express.static(path.join(__dirname, "client", "build")));
}

const routes = require("./routes");
app.use(routes);

const connection = require("./config/mongo-connection");
connection
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3001;

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
