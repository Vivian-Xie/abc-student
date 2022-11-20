console.log("hihhi");
let socket=io();

document.addEventListener("click",()=>{
    socket.emit('sendMessage','clicked the document!')
})