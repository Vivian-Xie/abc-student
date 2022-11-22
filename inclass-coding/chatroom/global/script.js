console.log("hi");

let socket=io();
let namebox=document.getElementById("name")
let chatbox=document.getElementById("chat")
let messagebox=document.getElementById("message")
let sendbutton=document.getElementById("send")

sendbutton.addEventListener("click",()=>{
    console.log("clicked");
    let name =namebox.value.trim()
    if (name==""){
        name="Leon"
        namebox.value=""
    }
    let message=messagebox.value.trim();
    if (message!=""){
        let data={name:name,message:message}
        socket.emit('message',data)
    }
    messagebox.value="";
})

socket.on("incoming",(data)=>{
    console.log(data);
    let name=data.name;
    let message=data.message;
    let li=document.createElement("li")
    // let span=document.createElement('span')
    li.innerHTML="<span class=sender>"+name+": </span><p>"+message+"</p>"
    // li.appendChild(p);
    chatbox.appendChild(li)
    chatbox.scrollTop=chatbox.scrollHeight;
    console.log("my socket is",socket.id);
    if (data.id===socket.id){
        li.style.textAlign="right"
        li.lastElementChild.className='me'
    }
})


messagebox.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      sendbutton.click();
    }
  });