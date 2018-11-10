function WebSocketTest() {

      // Let us open a web socket
      var socket = io("http://localhost:1337");


        socket.on('connection', function(data){
        console.log("second step done");
        alert("Message is sent...");
        socket.emit('data_comm', { my: 'data' });
        socket.emit('slidEvent', {"CMD" : "START",
                                  "PRES_ID" : "efa0a79a-2f20-4e97-b0b7-71f824bfe349"})
      });
}

function Listener(){
  var socket = io("http://localhost:1337");
console.log("Hello");
  socket.on('currentSlideState', (data) =>{
    document.write(data);
  });
}
