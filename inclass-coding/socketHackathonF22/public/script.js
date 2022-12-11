// let socket = io("");
let socket = io("https://abc-socket-hackathon.glitch.me");
let others = [];
let myId;
let testMode = true;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});


let btn2 = document.getElementById("btn2");
// let btn3 = document.getElementById("btn3");
// let btn4 = document.getElementById("btn4");
// let btn5 = document.getElementById("btn5");
let tweetbox=document.getElementById("tweetbox")
let btn1 = document.getElementById("btn1");
let allbtn=document.querySelectorAll("button");
let checkbox=document.querySelector(".switch")


checkbox.addEventListener("click",()=>{
  buttonOutput.style.backgroundColor = "red";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "black";
  }, 500)
})


btn1.addEventListener("click",()=>{
  if (tweetbox.value.trim()!=""){
    socket.emit("textToAllButMe", {value:tweetbox.value} )
    tweetbox.value=""
  }
})

btn2.addEventListener("click",()=>{
  socket.emit("button1ToAllButMe")

  let allbtn=document.querySelectorAll("button");
  for(i of allbtn){
  //  i.style.width="100vw";
   i.style.animation="spin  5s"
  
  }
})





socket.on("text",(msg)=>{
  console.log("text");
 let div=document.createElement("div");
 let p=document.createElement("p");
 document.body.appendChild(div)
 div.appendChild(p)
 p.innerHTML=msg.value
 p.className="unhappy"
 div.style.animation="spin 5s"
})



socket.on("button1",()=>{
  console.log("button1ToAllButMe-->received")
  btn2.classList.add("anim")
  setTimeout(()=>{
    btn2.classList.remove("anim") 
  },1000)
})