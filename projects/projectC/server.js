const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let allData = [];
let rooms = [];
let random_tree = [];
let rows=0;

app.use(express.static('global'))

app.get('/', (req, res) => {
  res.send(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');


  //find function 
  function isAppended(data) {
    return data.id == socket.id;
  }
  function needelete(data) {
    return data.id != socket.id;
  }

  function allocateRoom() {
    let roomWithSpot = rooms.findIndex(room => {
      return room.members.length < 4 && room.members.length != 0
    })
    if (roomWithSpot == -1) {
      let newIdx = rooms.length
      rooms.push({
        roomIndex: rooms.length,
        members: [socket.id],
      })
      // rooms[0].chaser = rooms[0].members[0];
      return newIdx;
    } else {
      rooms[roomWithSpot].members.push(socket.id);
      return roomWithSpot;
    }
  }

  socket.on("mapping", (row_num) => {
    if (random_tree.length==0) {
    for (let i = 0; i < ((row_num + 1) / 2) ** 2; i++) {
      do {
        random_row = Math.floor((Math.random() * row_num) + 1) - 1;
        random_list = Math.floor((Math.random() * row_num) + 1) - 1;
      }
      while ((random_row == 0 && random_list == 0) || (random_row == row_num - 1 && random_list == row_num - 1) || (random_row == 0 && random_list == row_num - 1) || (random_row == row_num - 1 && random_list == 0) || (random_row == 0 && random_list == 1) || (random_row == row_num - 1 && random_list == 1) || (random_row == row_num - 2 && random_list == row_num - 1));
      random_tree.push([random_row, random_list])
    }
  }
  // console.log(random_tree);
  rows=row_num;
  io.emit("planting",random_tree)
  })



  socket.on("initialize", (data) => {
    console.log("receiving starting with", data)
    data.id = socket.id;
    if (allData.find(isAppended) == undefined) {
      data.room = allocateRoom();
      console.log(rooms);
      if (socket.id == rooms[data.room].members[0]) {
        data.role = 'chaser';
      } else if (socket.id == rooms[data.room].members[1]){
        data.curX=rows-1;
        data.curY=0;
        data.preX=rows-1;
        data.preY=0;
        data.role = 'survivor';
      }else if (socket.id == rooms[data.room].members[2]){
        data.curY=rows-1;
        data.curX=0;
        data.preY=rows-1;
        data.preX=0;
        data.role = 'survivor';
      }else {
        data.curX=rows-1;
        data.curY=rows-1;
        data.preX=rows-1;
        data.preY=rows-1;
        data.role = 'survivor';
      }

    }
    allData.push(data)
    console.log("we are initializing player positions", allData)
    io.emit("refresh", allData)
  })


  socket.on("message", (data) => {
    var curdata = allData.find(isAppended)
    // allData = allData.filter(needelete)
    curdata.preX = data.preX;
    curdata.preY = data.preY;
    curdata.curX = data.curX;
    curdata.curY = data.curY;
    console.log("we are sending this to all", allData)
    io.emit("refresh", allData)

  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var thisdata = allData.find(isAppended)
    console.log(socket.id);
    // if (thisdata.role == 'chaser') {
    //   io.emit("survivor win")
    //   console.log("chaser out, end of game");
    // }
    allData = allData.filter(needelete);
    rooms= allData.filter(needelete)
  })
});





server.listen(3000, () => {
  console.log('listening on *:3000');
});