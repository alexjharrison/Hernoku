const express = require("express");
const path = require("path");
const util = require("util");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const GitHubStrategy = require("passport-github2");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




require("./routes/api-routes")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
