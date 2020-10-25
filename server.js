/* global process, __dirname */

const express = require("express");
const path = require("path");

const distPath = path.resolve(__dirname, "./dist");

const app = express();

app.use(express.static(distPath));

app.get("*", function (req, res) {
  res.sendFile(path.join(distPath + "/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
