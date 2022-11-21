console.log("This is a new page");

let button=document.getElementById("btn")
let input=document.getElementById("inputt")
let disappear=document.getElementById("disappear")
let appear=document.getElementById("appear")

// 把数据送到server里


button.addEventListener("click",()=>{
  let text = input.value;
  console.log(text.toLowerCase()==="waiting for my favorite song"||text.toLowerCase()==="waiting for my favorite songs"||text.toLowerCase()==="waiting for my favorite songs");
  if(text.toLowerCase()==="waiting for my favorite song"||text.toLowerCase()==="waiting for my favorite songs"||text.toLowerCase()==="waiting for my favorite songs"){
    window.location.href="/entrance?password=yesterday";
    let route = "/sendAnswer?answer="+text;
    fetch(route);
  }else{
    input.value="Wrong Answer!"
  }
})
input.addEventListener("click",()=>{
  if (input.value="Wrong Answer!"){
    input.value=""
  }
})