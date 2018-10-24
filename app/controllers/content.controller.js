'use strict';

var multer = require("multer");
var express = require("express");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const util = require ("../utils/utils.js")


module.exports.list = function (req, res){
  console.log("test")
  var listFiles = []
  fs.readdir(CONFIG.contentDirectory, function(err, contentItems){
    for(var i=0 ; i<contentItems.length ; i++){
      if(contentItems[i].toString().includes(".meta")){
        listFiles.push(contentItems[i]);
      }
    }
    res.send(listFiles);
  })
}

module.exports.read = function (){

}

module.exports.create = function (){

}
