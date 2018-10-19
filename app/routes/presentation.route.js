'use strict';

var express = require("express");
var router = express.Router();
module.exports = router;
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');

const listJSON = [];

router.route("/loadPresentation")
  .get(function(request, response){
    const map = {};

    fs.readdir(CONFIG.presentationDirectory, function(err, presentationItems){

      for(var i=0; i<presentationItems.length; i++){
         if(presentationItems[i].toString().includes(".json")){
           listJSON.push(presentationItems[i]);
         }
       }

       listJSON.forEach(presentationItem => {
         fs.readFile(path.join(CONFIG.presentationDirectory, presentationItem.toString()), (err, data) => {
           if (err) {
             console.error(err.message);
             return;
           }
           console.log(data.toString());
           var JSONfile = JSON.parse(data.toString());
           map[JSONfile.id] = JSONfile;

           if(Object.keys(map).length == listJSON.length){
             response.send(map);
           }
         })
       });


    })
  });

router.route("/savePresentation")
  .get(function(request, response){
    // response.readFile()
    response.end("It works! from presentationSave") //écrit dans le browser
  	console.log("It works! from routes")  // écrit dans le terminal


  })