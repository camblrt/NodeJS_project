'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
module.exports = router;
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
var jsonParser = bodyParser.json();

const listJSON = [];


router.route("/loadPres")
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
           var JSONfile = JSON.parse(data.toString());
           map[JSONfile.id] = JSONfile;

           if(Object.keys(map).length == listJSON.length){
             response.send(map);
           }
         })
       });


    })
  });

router.route("/savePres")
  .post(jsonParser,function(request, response){
    var data = JSON.stringify(request.body, null, 2);
    fs.writeFile(CONFIG.presentationDirectory + request.body.id + ".pres.json", data, function (err){
      if(err){
        console.error(err.message);
      }
      response.send("Saved")
    })

  })
