const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//express.http.server联动处理问题

app.use(express.static('global'))

app.get('/', (req, res) => {
  res.send(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on("message",(data)=>{
        console.log(data);
        console.log(socket.id);
        data.id=socket.id
        io.emit("incoming",data,socket.id)
        
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



    
server.listen(3000, () => {
  console.log('listening on *:3000');
});