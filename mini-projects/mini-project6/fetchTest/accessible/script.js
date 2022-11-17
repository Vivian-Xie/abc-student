console.log("This is a new page");

let button=document.getElementById("btn")
let input=document.getElementById("inputt")
let disappear=document.getElementById("disappear")
let appear=document.getElementById("appear")

// 把数据送到server里

button.addEventListener("click",()=>{
    if (input.value=="Waiting for my favorite songs"){
        console.log("yes");
        disappear.style.display="none"
        appear.style.display="block"
    }


})
