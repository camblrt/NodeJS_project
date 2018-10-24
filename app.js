'use strict';

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var defaultRoute = require("./app/routes/default.route.js");
var path = require("path");
var bodyParser = require("body-parser");
var contentRoute = require("./app/routes/content.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");

// init server
server.listen(CONFIG.port);
app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);


app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
module.exports = app;
