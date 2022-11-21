
//require node module 
const express = require('express')
const app = express()
const port = process.env.PORT||3000
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// the global file that need to be pushed 
app.use(express.static('global'))

//socket.io router 就像ajax一样
// if someone connects , this event listener detects the connection
io.on('connection', (socket) => {
    //how to deal with clients 知道谁上线了谁下线了
    console.log('a user connected'.socket.id);

    // if this client (socket) send a message to me (the server)
    socket.on('newClick', (msg) => {
        console.log('client ' + socket.id + ' pressed the doc ' + msg);
        // // send something to all other clients (including sender)
        // io.emit("someoneClicked", msg);
        // send to all except sender
        socket.broadcast.emit("someoneClicked", msg);
    });

    socket.on('keyDown', (msg) => {
        console.log('client ' + socket.id + ' pressed a key');
        // socket.broadcast.emit("someoneClicked", msg);
    });
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})