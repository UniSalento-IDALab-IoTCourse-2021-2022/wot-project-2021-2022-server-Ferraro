// Importing the required modules
const WebSocketServer = require('ws');
const fs = require('fs');
const dumpfile = "./received.json"

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 7777 })
 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }

    fs.watchFile(dumpfile, (curr, prev) =>{
        fs.readFile("received.json", (err, data) =>{
            //let received = JSON.parse(data);
            if(data != undefined){
                ws.send(JSON.stringify(JSON.parse(data))) 
            }
        })
    })

});
//console.log("The WebSocket server is running on port 7777");
/** 
fs.watchFile(dumpfile, (curr, prev) =>{
    fs.readFile("received.json", (err, data) =>{
        //let received = JSON.parse(data);
        if(data != undefined){
            wss.send(data) 
        }
    })
})
*/