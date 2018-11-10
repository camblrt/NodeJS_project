'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
module.exports = router;
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
var jsonParser = bodyParser.json();
const axios = require("axios");


router.route("/login")
  .get(function(request, response){
    response.send("It works");
  })
  .post(jsonParser, function(request, response){
      axios.post('http://localhost:8080/FrontAuthWatcherWebService/rest/WatcherAuth', { "login": request.body.userName, "password":request.body.password})
      .then(function (res){
        let autorise = "NONE";
        if(res.data.validAuth === true){
          if(res.data.role === "USER"){
            autorise = "USER";
          }
          else{
            autorise = "ADMIN";
          }
          response.send(autorise);
        }
      })
  });
