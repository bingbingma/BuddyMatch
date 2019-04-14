const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listing on port %s", port));

//loads body parser? (allows url parsing?)
app.use(bodyParser.json());
//url encoded == true what does this mean? A: apparently it allows extended objects
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("app/public"));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(port, () =>
  console.log("Server listening on: http://localhost:" + port)
);
