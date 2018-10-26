'use strict';

var multer = require("multer");
var express = require("express");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const util = require ("../utils/utils.js")
var ContentModel = require("../models/content.model.js");


module.exports.list = function (req, res){
  var map = {};
  var listFiles = [];
  fs.readdir(CONFIG.contentDirectory, function(err, contentItems){
    if(err){
      return err;
    }
    for(var i=0 ; i<contentItems.length ; i++){
      if(contentItems[i].toString().includes(".meta")){
        listFiles.push(contentItems[i]);
      }
    }
    listFiles.forEach(contentItem => {
      fs.readFile(path.join(CONFIG.contentDirectory, contentItem.toString()), (err, data) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(data.toString());
        var JSONfile = JSON.parse(data.toString());
        map[JSONfile.id] = JSONfile;

        if(Object.keys(map).length == listFiles.length){
          res.send(map);
        }
      })
    });
  })
}

module.exports.read = function (req, response){
  if(req.contentId === null){
    return new Error("L'id de la requête ne peut être null")
  }
  ContentModel.read(req.contentId, (err,res) => {
    if(err){
      return(err);
    }
    console.log(req.query);
    if(!!req.query.json){
      return response.send(res);
    }
    if(res.fileName != null && res.type === "img"){
      console.log(util.getDataFilePath(res.fileName));
        return response.sendFile(util.getDataFilePath(res.fileName), { root: "./" });
    }
    else{
      return response.send(res.src);
    }
  })
}

module.exports.create = function (req, response){
  var content = new ContentModel({});
  console.dir(req.file);
  util.readFileIfExists(req.file.path, (err,res) =>{
    content.setData(res);
    if(req.file.mimetype.toString().includes("image")){
      content.type= "img";
    }
    content.id = util.generateUUID();
    content.title=req.body.title;
    content.fileName = content.id + path.extname(req.file.originalname);
    content.src="content/"+content.id;
    console.log(content);
    ContentModel.create(content, (err,res) => {
      if(err){
        return err;
      }
      return response.send(content);
    })
  })
}
