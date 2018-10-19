'use strict';

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var defaultRoute = require("./app/routes/default.route.js");
var path = require("path");

var presentationRoute = require("./app/routes/presentation.route.js");

// init server
server.listen(CONFIG.port);
app.use(defaultRoute);
app.use(presentationRoute);


app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
