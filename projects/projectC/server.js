const express = require('express');
const app = express();
// const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let allData = [];
let rooms = [];
let random_tree = [];
let rows = 0;
let barrier = false;



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


  function allocateRoom() {
    let roomWithSpot = rooms.findIndex(room => {
      return room.members.length < 4 && room.members.length != 0
    })
    let random_emoji = Math.floor(Math.random() * 4 + 1) - 1;
    if (roomWithSpot == -1) {
      let newIdx = rooms.length
      rooms.push({
        roomIndex: rooms.length,
        members: [socket.id],
        emoji:random_emoji
      })
      // rooms[0].chaser = rooms[0].members[0];
      return newIdx;
    } else {
      rooms[roomWithSpot].members.push(socket.id);
      return roomWithSpot;
    }
  }




  socket.on("mapping", (row_num) => {
    if (random_tree.length == 0) {
      for (let i = 0; i < ((row_num) / 2) ** 2 + 6; i++) {
        do {
          random_row = Math.floor((Math.random() * row_num) + 1) - 1;
          random_list = Math.floor((Math.random() * row_num) + 1) - 1;
        }
        while ((random_row == 0 && random_list == 0) || (random_row == row_num - 1 && random_list == row_num - 1) || (random_row == 0 && random_list == row_num - 1) || (random_row == row_num - 1 && random_list == 0) || (random_row == 0 && random_list == 1) || (random_row == row_num - 1 && random_list == 1) || (random_row == row_num - 2 && random_list == row_num - 1) || (random_row == 0 && random_list == row_num - 2));
        random_tree.push([random_row, random_list])
      }
    }
    // console.log(random_tree);
    rows = row_num;
    io.emit("planting", random_tree)
  })



  socket.on("initialize", (data) => {
    // console.log("receiving starting with", data)
    
    data.id = socket.id;
    if (allData.find(isAppended) == undefined) {
      data.room = allocateRoom();
      data.emoji = rooms[data.room].emoji;
      if (socket.id == rooms[data.room].members[0]) {
        data.role = 'chaser';
      } else if (socket.id == rooms[data.room].members[1]) {
        data.curX = rows - 1;
        data.curY = 0;
        data.role = 'survivor';
      } else if (socket.id == rooms[data.room].members[2]) {
        data.curY = rows - 1;
        data.curX = 0;
        data.role = 'survivor';
      } else {
        data.curX = rows - 1;
        data.curY = rows - 1;
        data.role = 'survivor';
      }
      socket.emit("rules", data)
    }
    socket.join('room' + data.room);
    allData.push(data)
    console.log("we are initializing player positions", allData)
    io.in("room" + data.room).emit("start", [rooms[data.room].members.length, data.role]);
  })


  socket.on("ready", () => {
    var curdata = allData.find(isAppended);
    console.log(curdata);
    io.in("room" + curdata.room).emit("refresh",
      allData.filter(thisdata => {
        return thisdata.room == curdata.room;
      })
    );
  })


  socket.on("message", (message) => {
    var curdata = allData.find(isAppended);
    if (curdata) {
      let x = curdata.curX;
      let y = curdata.curY;
      let w = curdata.curX;
      let z = curdata.curY;
      //wasd挪移
      if (message == 's') {
        z = y + 1;
      } else if (message == 'w') {
        z = y - 1;
      } else if (message == 'a') {
        w = x - 1;
      } else if (message == 'd') {
        w = x + 1;
      } else if (message == 'q') {
        if (curdata.role == 'chaser') {
          w = x - 1;
          z = y - 1;
        }
      } else if (message == 'e') {
        if (curdata.role == 'chaser') {
          w = x + 1;
          z = y - 1;
        }
      } else if (message == 'z') {
        if (curdata.role == 'chaser') {
          w = x - 1;
          z = y + 1;
        }
      } else if (message == 'x') {
        if (curdata.role == 'chaser') {
          w = x + 1;
          z = y + 1;
        }
      }

      ///防止超格
      if (z < 0) {
        z = 0;
      } else if (z >= rows) {
        z = rows - 1;
      }
      if (w < 0) {
        w = 0;
      } else if (w >= rows) {
        w = rows - 1;
      }
      //防止踩到树上
      for (let i = 0; i < random_tree.length; i++) {
        if (w == random_tree[i][0] && z == random_tree[i][1]) {
          barrier = true;
          // console.log(random_tree[i][0], random_tree[i][1])
        }
      }
      if (!barrier) {
        curdata.preX = x;
        curdata.preY = y;
        curdata.curX = w;
        curdata.curY = z;
      }
      barrier = false;
      ///detect whether any survivor lose the game
      let loser = {};
      let roomppl = allData.filter(thisdata => {
        return thisdata.room == curdata.room;
      })
      for (var i = 1; i < roomppl.length; i++) {
        if (roomppl[0].curX == roomppl[i].curX && roomppl[0].curY == roomppl[i].curY) {
          loser = allData[i];
          break;
        }
      }
      if (JSON.stringify(loser) != '{}') {
        console.log(loser);
        console.log("survivor caught");
        io.to(loser.id).emit("survivor out");
        allData.splice(allData.findIndex(data => {
          return data.id == loser.id;
        }), 1);;
        rooms[loser.room].members.splice(loser.id, 1);
        if (rooms[loser.room].members.length == 0 && loser.room == rooms.length - 1) {
          rooms.splice(loser.room, 1);
        } else if (rooms[loser.room].members.length == 1) {
          // let other in this room know 
          socket.to("room" + loser.room).emit("chaser win")
        } else {
          socket.to("room" + loser.room).emit("personLeft")
        }
      }

      ///send completed data to everyone
      console.log("we are sending this to all", allData);
      io.in("room" + curdata.room).emit("refresh", allData.filter(thisdata => {
        return thisdata.room == curdata.room;
      })
      );
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var thisdata = allData.find(isAppended)
    if (thisdata) {
      if (thisdata.role == 'chaser') {
        io.in("room" + thisdata.room).emit("survivor win");
        allData.splice(allData.findIndex(data => {
          return data.id == thisdata.id;
        }), 1)
        rooms[thisdata.room].members.splice(0,rooms[thisdata.room].members.length);
        console.log("chaser out, end of game");
      } else {
        io.in("room" + thisdata.room).emit("survivor dis", thisdata)
        console.log("one survivor disconnected");
        allData.splice(allData.findIndex(data => {
          return data.id == thisdata.id;
        }), 1);
        rooms[thisdata.room].members.splice(thisdata.id, 1);
        if (rooms[thisdata.room].members.length == 0 && thisdata.room == rooms.length - 1) {
          rooms.splice(thisdata.room, 1);
        } else if (rooms[thisdata.room].members.length == 1) {
          // let other in this room know 
          socket.to("room" + loser.room).emit("chaser win")
        } else {
          socket.to("room" + loser.room).emit("personLeft")
        }
      }
      console.log(allData);
      socket.leave('room' + thisdata.room);
    }
  });
});





server.listen(3000, () => {
  console.log('listening on *:3000');
});