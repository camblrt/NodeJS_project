var io = require("socket.io")
var ContentModel = require("../models/content.model.js");
var util = require("../utils/utils.js")
var CONFIG = JSON.parse(process.env.CONFIG);



module.exports.listen = function(httpServer, callback){
  var socketList=[];
  var map={};
  io(httpServer).on('connection', (socket) =>{
    socketList.push(socket);
    socket.on('data_comm', (data)=>{
      map[data] = socket;
      socket.on('slidEvent', (slide)=>{
        util.readFileIfExists(CONFIG.presentationDirectory + slide.PRES_ID + ".pres.json", (err,res)=>{
          var json = JSON.parse(res);
          switch (slide.CMD) {
              case "START":
                ContentModel.read(json.slidArray[0].content_id, (error, response) =>{
                  if(error){
                    callback(error);
                  }
                  Broadcast(socketList, response);
                });
              break;
              case "PAUSE":
                ContentModel.read(slide.CONTENT_ID, (error, response)=>{
                  if(error){
                    callback(error);
                  }
                  Broadcast(socketList, response);
                });
              break;
              case "END":
                let i = json.slidArray.length;
                ContentModel.read(json.slidArray[i-1].content_id, (error, response)=>{
                  if(error){
                    callback(error);
                  }
                  Broadcast(socketList, response);
                });
              break;
              case "BEGIN":
                ContentModel.read(json.slidArray[0].content_id, (error, response)=>{
                  if(error){
                    callback(error);
                  }
                  Broadcast(socketList, response);
                });
              break;
              case "PREV":
              let n = 0;
                json.slidArray.forEach(contentItem => {
                  if(contentItem.content_id === slide.CONTENT_ID){
                    if(n != 0){
                      ContentModel.read(json.slidArray[n-1].content_id, (error, response)=>{
                        if(error){
                          callback(error);
                        }
                        Broadcast(socketList, response);
                      });
                    }
                    else{
                      ContentModel.read(json.slidArray[0].content_id, (error, response)=>{
                        if(error){
                          callback(error);
                        }
                        Broadcast(socketList, response);
                      });
                    }
                  }
                  n++;
                });
              break;
              case "NEXT":
              let m = 0;
                json.slidArray.forEach(contentItem => {
                  if(contentItem.content_id === slide.CONTENT_ID){
                    if(m != json.slidArray.length-1){
                      ContentModel.read(json.slidArray[m+1].content_id, (error, response)=>{
                        if(error){
                          callback(error);
                        }
                        Broadcast(socketList, response);
                        return;
                      });
                    }
                    else{
                      ContentModel.read(json.slidArray[m].content_id, (error, response)=>{
                        if(error){
                          callback(error);
                        }
                        Broadcast(socketList, response);
                        return;
                      });
                    }
                  }
                  m++;
                });
              break;
            default:
              break;
          }
        });
      })
    });
    socket.emit('connection');
  });


}

function Broadcast(socketList, content){
  socketList.forEach((socket) => {
    socket.emit("currentSlidEvent", content);
  });
}
