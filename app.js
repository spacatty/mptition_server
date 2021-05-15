const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

// const serveStatic = require("serve-static");
// const history = require("connect-history-api-fallback");
require("dotenv").config();
require("./auth/passport-setup");

const app = express();

app.disable("X-POWERED-BY");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

mongoose.connect(
  process.env.MONGO_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`+ DB`);
  }
);

app.use("/auth", require("./assets/routes/authRoute.js"));
app.use("/dash", require("./assets/routes/dashRoute.js"));
app.use("/news", require("./assets/routes/newsRoute.js"));
app.use("/competitions", require("./assets/routes/competitionsRoute.js"));

// app.use(history());
// app.use(serveStatic(__dirname + "/dist/spa"));

app.listen(process.env.PORT || 8090, () => {
  console.log(`+ APP IN ${process.env.PORT || 8090}`);
});
