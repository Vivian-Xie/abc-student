let btn = document.querySelector('button')
let div = document.getElementById("ad");
let countcl = document.getElementById("count_clock")
let secure=document.getElementById('secure')
let link=document.getElementById("policy")
let press = false;
let counter=0;
let count = 3;
// console.log(pAll);

function hideImg() {
    div.style.display = "none";
    count=3;
    console.log(count);
}
function showImg() {
    // var img = document.getElementById("img2");
    div.style.display = "block";
    setTimeout("hideImg()", 3000)
    count=3;
}

var CountDown = function () {
    count=count-1;
    var output = 'The ad will be closed after ' + count + ' seconds'
    countcl.innerText = output;
    // console.log(output); 
}



function advertisement() {
    if (press) return
    press = true;
    if (counter<3) {
    showImg()
    console.log("haha");
        // window.setInterval(CountDown, 1000)
    }else{
        window.open("https://brightspace.nyu.edu/d2l/home")
    }
    press = false;
    counter++;
}
function ad_text() {
        window.setInterval(CountDown, 1000)
        if (count<0){
            count=3
        }
    // press = false;
}
btn.addEventListener('mouseover', advertisement)
btn.addEventListener('mouseover', ad_text)


function openSingleWindow(n){
    for (let i=0;i<n;i++){

        let ranX = Math.random() * screen.width - popUpWidth;
        let ranY = Math.random() * screen.height - popUpHeight;
        let win = window.open("https://vivian-xie.github.io/abc-student/mini-projects/mini-project2/temp", "", "width=300,height=200,left=" + ranX + ",top=" + ranY)
        function closeWindow() {
            win.close()
        }
        setTimeout(closeWindow, 2000)
    }

}

let popUpWidth = 300
let popUpHeight = 200
link.onclick=function() {
    // console.log("button clicked");
    openSingleWindow(10)
}
secure.onclick=function() {
    // console.log("button clicked");
    openSingleWindow(10)
}
