'use strict';

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var http = require("http");
var express = require("express");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");
var contentRoute = require("./app/routes/content.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var IOController = require("./app/controllers/io.controller.js");
var loginRoute = require("./app/routes/login.route.js");


var app = express();
var server = http.createServer(app);// init server

IOController.listen(server);
//app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);
app.use(loginRoute);

app.use("/admin", express.static(path.join(__dirname, "build")));
app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
app.use("/", express.static(path.join(__dirname, "/")));

server.listen(CONFIG.port);
