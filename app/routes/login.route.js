'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
module.exports = router;
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');


router.route("/login/:userName/:password")
  .post(function(request, response){
      axios.post('http://localhost:8080/FrontAuthWatcherWebService/rest/WatcherAuth', { login: request.userName, request.password: password })
      .then(function (response){
        console.log(response);
      })
  });

router.param('userName', 'password', function(req, res, next, name, password) {
 req.name = name;
 req.password = password;
 next();
});
