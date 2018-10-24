"use strict";
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const util = require ("../utils/utils.js")


module.exports = class ContentModel {
  /*public type;
  public id;
  public title;
  public src;
  public fileName;
  private data;*/

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
      if(content.getData().length >0){
        fs.writeFile(CONFIG.contentDirectory + content.fileName, content.getData(), (err,res) => {
          if(err){
            return callback(err);
          }
          console.log("enregistré en image");
          var data = JSON.stringify(content)
          fs.writeFile(CONFIG.contentDirectory + content.id +".meta.json", data, (err,res) =>{
            if(err){
              return callback(err);
            }
            console.log("enregistré en JSON");
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
          console.log("enregistré en JSON");
          callback(null,this);
        })
      }
  }

static read(id, callback){
      util.readFileIfExists(util.getMetaFilePath(id) , (err,data) => {
        if(err){
          return callback(err);
        }

        callback(null, new ContentModel(data));
      })
   }

 static update(content, callback){
   "use strict";
    if(content.type === "img" && content.data != null && content.data > 0){
        create(content , callback);
     }
   }



  static delete(id, callback){
    "use strict";
      fs.deleteFile(read(id, callback), (err,res) =>{
        if(err){
          console.log(err)
          return
        }
        console.log("File deleted")
      })
     }
 }
