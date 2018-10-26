var io = require("socket.io")
var ContentModel = require("../models/content.model.js");
var util = require("../utils/utils.js")
var ContentPres = require("./content.pres.controller.js");
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
          switch (slide.CMD) {
              case START:
                Broadcast(socketList, ContentModel.read(res.slidArray[0].contentMap.1));
              break;
              case PAUSE:
                Broadcast(socketList, ContentModel.read(res.CONTENT_ID));
              break;
              case END:
                let i = res.slidArray.length;
                Broadcast(socketList, ContentModel.read(res.slidArray[i-1].contentMap.1));
              break;
              case BEGIN:
                Broadcast(socketList,ContentModel.read(res.slidArray[0].contentMap.1));
              break;
              case PREV:
              let i = 0;
                res.slidArray.forEach(contentItem => {
                  if(contentItem.id === res.CONTENT_ID){
                    if(i != 0){
                      Broadcast(socketList, ContentModel.read(res.slidArray[i-1].contentMap.1));
                    }
                    else{
                      Broadcast(socketList, ContentModel.read(res.slidArray[i].contentMap.1));
                    }
                  }
                  i++;
                });
              break;
              case NEXT:
              let i = 0;
                res.slidArray.forEach(contentItem => {
                  if(contentItem.id === res.CONTENT_ID){
                    if(i != res.slidArray.length-1){
                      Broadcast(socketList, ContentModel.read(res.slidArray[i+1].contentMap.1));
                    }
                    else{
                      Broadcast(socketList, ContentModel.read(res.slidArray[i].contentMap.1));
                    }
                  }
                  i++;
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
  for(let i in socketList){
    i.emit('currentSlideState', content);
  }
}
