'use strict';

var multer = require("multer");
var express = require("express");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const util = require ("../utils/utils.js")
var ContentModel = require("./app/models/content.model.js");


module.exports.list = function (req, res){
  var listFiles = {};
  fs.readdir(CONFIG.contentDirectory, function(err, contentItems){
    for(var i=0 ; i<contentItems.length ; i++){
      if(contentItems[i].toString().includes(".meta")){
        listFiles.push(contentItems[i].id + ":" + JSON.stringify(contentItems[i]).data);
      }
    }
    res.send(listFiles);
  })
}

module.exports.read = function (req, response){
  var content = new ContentModel()
  content.read(req.id, (err,res){
    if(err){
      return(err);
    }
    if(req.getData() !== null && req.type !== "img"){
      response.send(req.getData());
    }
    else if(req.json === true){
      resonse.send(res);
    }
    else{
      response.sendFile(CONFIG.contentDirectory + req.fileName);
  }
  })
}

module.exports.create = function (){

}
