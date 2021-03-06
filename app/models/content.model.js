"use strict";
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const util = require ("../utils/utils.js")


module.exports = class ContentModel {

  constructor({type,id,title,src,fileName}) {
    this.type = type;
    this.id = id;
    this.title = title;
    this.src = src;
    this.fileName = fileName;
    var data
    this.setData = function(pData){
      data = pData;
    }
    this.getData = function(){
      return data;
    }
  }


static create(content, callback){
  if(content.id === null){
    return callback(new Error("id ne peut pas etre null"));
  }
  if(!content.toString().includes({})){
    return callback(new Error("Content doit être un objet JSON"));
  }
      if(content.getData().length >0){
        fs.writeFile(CONFIG.contentDirectory + content.fileName, content.getData(), (err,res) => {
          if(err){
            return callback(err);
          }
          var data = JSON.stringify(content)
          fs.writeFile(CONFIG.contentDirectory + content.id +".meta.json", data, (err,res) =>{
            if(err){
              return callback(err);
            }
            callback(null,this);
          })
        })
      }
      else{
        var data = JSON.stringify(content)
        fs.writeFile(CONFIG.contentDirectory + content.id +".meta.json", data, (err,res) =>{
          if(err){
            return callback(err);
          }
          callback(null,this);
        })
      }
    }


static read(id, callback){
  if(id === null){
    return callback(new Error("id ne peut pas etre null"));
  }
      util.readFileIfExists(util.getMetaFilePath(id) , (err,data) => {
        if(err){
          return callback(new Error("Le fichier avec l'id " + id +" n'existe pas"));
        }

        callback(null, new ContentModel(JSON.parse(data.toString())));
      })
   }

 static update(content, callback){
   if(content.id === null){
     return callback(new Error("id ne peut pas etre null"));
   }
    if(content.getData().length > 0){
      ContentModel.read(content.id, (err,res) => {
        if(err){
          return callback(err);
        }
        ContentModel.create(content , (err,res) =>{
          if(err){
            return callback(err);
          }
          return callback(null, content);
        })
      })

   }
 }



  static delete(id, callback){
    if(id === null){
      return callback(new Error("id ne peut pas etre null"));
    }
    ContentModel.read(id, (err,res) => {
      if(err){
        callback(err);
      }
      if(res.fileName !== null){
        var neededId = res.id
        fs.unlink(util.getDataFilePath(res.fileName), (err,res) =>{
          if(err){
            return callback(err);
          }
          fs.unlink(util.getMetaFilePath(neededId), (err,res) =>{
            if(err){
              return callback(err);
            }
            callback(null, this);
          })
        })

      }
      else{
        fs.unlink(util.getMetaFilePath(JSON.parse(res).id), (err,res) =>{
          if(err){
            return callback(err);
          }
          callback(null, this);
        })
       }

    })
  }
 }
