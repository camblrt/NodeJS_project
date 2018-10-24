'use strict';

var express = require("express");
var router = express.Router();
module.exports = router;


router.route("/")
  .get(function(request, response){
    response.end("It works! from routes2") //écrit dans le browser
  	console.log("It works! from routes")  // écrit dans le terminal
  })
  // .post(function(request, response){...})
  // .put(function(request, response){...})
  // .delete(function(request, response){...})
  // .all(function(request, response){...})
