// Importing the required modules
const WebSocketServer = require('ws');
const fs = require('fs');
const dumpfile = "./received.json"
const N = 2.4 //transmission strength
const measured_power = -69 //measure obtainded from the system

//Distance will be 10^((measured power - rssi)/(10*N))
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
            if(data != undefined){
                var locator = []
                let received_data = JSON.parse(data);
                for (var single_node in received_data){
                    for (var addr in received_data[single_node]){
                        if(locator.find(item => item.address === addr) === undefined){
                            locator.push({
                                "address": addr,
                                "values": [
                                    {
                                        "node": single_node,
                                        "rssi": 10 ** ((measured_power - parseInt(received_data[single_node][addr])) / (10 * N))
                                    }
                                ]
                            })
                        }else {
                            locator[locator.findIndex(item => item.address === addr)].values.push({
                                "node": single_node,
                                "rssi": 10 ** ((measured_power - parseInt(received_data[single_node][addr])) / (10 * N))                            })
                        }

                    }
                }
                
                ws.send(JSON.stringify(locator))
                //ws.send(JSON.stringify(JSON.parse(data))) 
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