let socket = io();
let container = document.getElementById("grid_container");
let prepare_box = document.getElementById("preparation");
let seeker = document.getElementById("seeker");
let hider = document.getElementById("hider");
let btn = document.getElementById("start");
let wait_text = document.getElementById("wait")
let room = -1;
let barrier = false;
let start = false;

let x = 0;
let y = 0;

let w = 0;
let z = 0;

let emojiList = [["😈", "🙂", "😪", "😱"], ["👻", "😆", "😴", "😮"], ["😡", "😇", "😏", "🥳"], ["🦊", "🐹", "🐰", "🐣"]]


//draw all the grids here
let row_num = 13; ///change the chess size
let list_num = row_num;
let tbody = document.querySelector("tbody")
for (let i = 0; i < row_num; i++) {
    let grid_row = document.createElement("tr")
    tbody.appendChild(grid_row);
    grid_row.className = "grid";
    for (let j = 0; j < list_num; j++) {
        let td = document.createElement("td")
        grid_row.appendChild(td)
    }
}

socket.emit("mapping", row_num)
let random_tree = []
socket.on("planting", (data) => {
    // console.log("mapping", data)
    for (let i = 0; i < data.length; i++) {
        container.rows[data[i][1]].cells[data[i][0]].innerHTML = "🌲"
    }
    random_tree = data;
})


function drawPlayer(x, y, emoji) {
    container.rows[y].cells[x].innerHTML = emoji;

}



let check = false;
let data = { preX: 0, preY: 0, curX: 0, curY: 0 }
btn.onclick = function () {
    socket.emit('initialize', data)
}
socket.on("start", (data) => {
    wait_text.innerHTML = "Waiting for " + (4 - data[0]) + " more people to get into the room!"
    if (check) return
    if ((4 - data[0]) == 0) {
        socket.emit("ready");
    }
    if (data[1] == 'chaser') {
        seeker.style.border = "4px solid black"
        check = true;
    } else {
        hider.style.border = "4px solid black";
        check = true;

    }
})




// drawPlayer(data.curX, data.curY, "😘");

document.onkeyup = function (e) {

    if (e.key == 's') {
        console.log("sending...", 's');
        socket.emit('message', 's')
    } else if (e.key == 'w') {
        console.log("sending...", 'w');
        socket.emit('message', 'w')
    } else if (e.key == 'a') {
        console.log("sending...", 'a');
        socket.emit('message', 'a')
    } else if (e.key == 'd') {
        console.log("sending...", 'd');
        socket.emit('message', 'd')
    } else if (e.key == 'q') {
        console.log("sending...", 'q');
        socket.emit('message', 'q')
    } else if (e.key == 'e') {
        console.log("sending...", 'e');
        socket.emit('message', 'e')
    } else if (e.key == 'z') {
        console.log("sending...", 'z');
        socket.emit('message', 'z')
    } else if (e.key == 'x') {
        console.log("sending...", 'x');
        socket.emit('message', 'x')
    }



}



//protect the user from going out of the chessbox
function protection(x, y) {
    if (y < 0) {
        y = 0;
    } else if (y >= container.rows.length) {
        y = container.rows.length - 1;
    }
    if (x < 0) {
        x = 0;
    } else if (x >= container.rows.length) {
        x = container.rows.length - 1;
    }
    return [x, y]
}

socket.on("refresh", (allData) => {
    wait_text.innerHTML = "Entering the room..."
    setTimeout(() => {
        prepare_box.style.display = "none";
    }
        , 1000)

    // console.log(allData);
    for (data of allData) {
        container.rows[data.preY].cells[data.preX].innerHTML = "";
    }
    for (let t = 0; t < allData.length; t++) {
        drawPlayer(allData[t].curX, allData[t].curY, emojiList[allData[t].emoji][t]);
    }


})
socket.on("survivor win", () => {
    let div_win = document.createElement('div');
    document.body.appendChild(div_win);
    div_win.className = 'prepare';
    let text_win = document.createElement('h1');
    div_win.appendChild(text_win);
    // text_win.className='';
    text_win.innerHTML = " </br>The seeker is out. End of the game.</br>For starting a new game, please refresh to enter another room.</br>😘";

})
socket.on("personLeft", () => {
    document.body.style.backgroundColor = 'bisque';
    setTimeout(() => {
        document.body.style.backgroundColor = 'white';
        
    }
    , 2000)
    
})

socket.on("survivor out", () => {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        let div_win = document.createElement('div');
        document.body.appendChild(div_win);
        div_win.className = 'prepare';
        let text_win = document.createElement('h1');
        div_win.appendChild(text_win);
        // text_win.className='';
        text_win.innerHTML = " </br>Sorry! You are eliminated.</br>For starting a new game, please refresh to enter another room.</br>😘";
    }
        , 2000)

})
socket.on("survivor dis", (data) => {
    container.rows[data.curY
    ].cells[data.curX].innerHTML = ""
    
})




