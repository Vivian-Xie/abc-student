
//require node module 
const express = require('express')
const app = express()
const port = 3000
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

    socket.on("new message",(msg)=>{
        console.log('message'+msg);
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})