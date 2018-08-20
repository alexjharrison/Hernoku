const express = require("express");
const path = require("path");
const util = require("util");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const GitHubStrategy = require("passport-github2");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");

const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://127.0.0.1:${PORT}/auth/callback`
},
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'my secret thing', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app,passport);
require("./routes/api")(app);


//force:true drops table if exists
db.sequelize.sync(/*{ force: true }*/).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});





