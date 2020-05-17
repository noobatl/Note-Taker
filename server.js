const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ROUTER
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// LISTENER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
