const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");

require("dotenv").config();

const app = express();

app.disable("X-POWERED-BY");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

mongoose.connect(
  process.env.MONGO_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log(`+ DB CONENCTION`);
  }
);

mongoose.set("useCreateIndex", true);

app.use("/auth", require("./assets/routes/authRoute.js"));
app.use("/users", require("./assets/routes/usersRoute.js"));
app.use("/news", require("./assets/routes/newsRoute.js"));
app.use("/competitions", require("./assets/routes/competitionsRoute.js"));

app.use(history());
app.use(serveStatic(__dirname + "/dist/spa"));

app.listen(process.env.PORT || 8080, () => {
  console.log(`+ APP IN ${process.env.PORT || 8080}`);
});
