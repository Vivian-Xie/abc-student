// let content=document.querySelector("#content")
let bolder = document.getElementById("bold")
let virgin = document.getElementById("virgin")
let color = document.querySelector("#virgin")
let teal = document.querySelector("#TealLove")
let img = document.createElement("image")
bolder.style.fontSize = "30px";
// color.style.backgroundColor="black"
// color.style.height=Math.ceil(Math.random()*10)*10+"px";
// console.log("hah");
virgin.onclick = function () {
    console.log("haha");
    virgin.innerHTML = "<img src='color.jpg'></img>"
    virgin.firstElementChild.style.position = "relative"

}
teal.onclick = function () {
    console.log("haha");
    teal.innerHTML = "<img src='color.jpg'></img>"
    teal.firstElementChild.stylewidth = "1600px"
    teal.firstElementChild.style.position = "relative"
    teal.firstElementChild.style.right = "0px"


}