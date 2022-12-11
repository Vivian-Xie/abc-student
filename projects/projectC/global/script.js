let socket = io();
let container = document.getElementById("grid_container")
let room = -1;
let barrier=false;

let x = 0;
let y = 0;

let w = 0;
let z = 0;

//draw all the grids here
let row_num = 11; ///change the chess size
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

socket.emit("mapping",row_num)
let random_tree=[]
socket.on("planting", (data) => {
    console.log("mapping",data)
    for (let i = 0; i <data.length; i++) {
        container.rows[data[i][0]].cells[data[i][1]].innerHTML = "🌲"
    }
    random_tree=data;
})


function drawPlayer(x, y, emoji) {
    [x, y] = protection(x, y)
    container.rows[y].cells[x].innerHTML = emoji;
    // console.log("new draw x y at " + x + " " + y);

}




let data = { preX: 0, preY: 0, curX: 0, curY: 0 }
// drawPlayer(data.curX, data.curY, "😘")
socket.emit('initialize', data)
document.onkeyup = function (e) {
    //只有wasd进入操作
    if (e.key != 's' && e.key != 'w' && e.key != 'a' && e.key != 'd') return
    //只有前方无障碍进入操作



    [x, y] = protection(x, y)
    barrier=false;
    // console.log("old deleted x y is " + x + " " + y);
    // data = { preX: x, preY: y }
    data.preX=x;
    data.preY=y;
    if (e.key == 's') {
        y = y + 1;
    } else if (e.key == 'w') {
        y = y - 1;
    } else if (e.key == 'a') {
        x = x - 1;
    } else if (e.key == 'd') {
        x = x + 1;
    }
    // drawPlayer(x, y)
    for (let i=0;i<random_tree.length;i++){
        // console.log(random_tree[i][0],random_tree[i][1])
        // console.log(x==random_tree[i][0]&&y==random_tree[i][1])
        if(y==random_tree[i][0]&&x==random_tree[i][1]){
            barrier=true;
        }
    }
    if(!barrier){
        data.curX = x;
        data.curY = y;
    }else{
        x=data.preX;
        y=data.preY;
    }
    console.log("sending...", data);
    socket.emit('message', data)
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
    for (data of allData) {
        container.rows[data.preY].cells[data.preX].innerHTML = "";
        drawPlayer(data.curX, data.curY, "😘")
    }

})
socket.on("survivor win", () => {
    console.log("yes win");
    document.body.style.backgroundColor='red'
    // for(let i=0;i<tbody.children.length;i++){

    //     tbody.removeChild(grid_row)
    // }

})



