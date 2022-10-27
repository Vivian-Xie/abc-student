
let water_wrap=document.createElement('div')
document.documentElement.appendChild(water_wrap)
water_wrap.className="water_wrap"
let water=document.createElement('div')
water_wrap.appendChild(water)
water.className="water"

let full_screen=document.createElement('div')
document.documentElement.appendChild(full_screen)
full_screen.className="full_screen"
let fish=document.createElement('div')
full_screen.appendChild(fish)
fish.className="fish"
let eye=document.createElement('div')
fish.appendChild(eye)
eye.className="eye"
let tail=document.createElement('div')
fish.appendChild(tail)
tail.className="tail"

water.style.cssText = "left:-80%;top:60%;border-radius:40%;width:260%;height:500%;";
var x, y;
document.onmousedown = function (e) {
    var e = e || window.event; 
    x = e.clientX - fish.offsetLeft;
    y = e.clientY - fish.offsetTop;
}

document.onmousemove = function (e) {
    var e = e || window.event;
    var moveX = e.clientX - x; //得到距离左边距离 
    console.log(moveX);
    var moveY = e.clientY - y; //得到距离上边距离

    var maxX = document.documentElement.clientWidth - fish.offsetWidth;
    var maxY = document.documentElement.clientHeight - fish.offsetHeight;
    if (e.clientX - fish.offsetLeft>0) {
        fish.style.transform = "rotateY(180deg)";
    } else {
        fish.style.transform = "rotateY(0deg)";

    }

    moveX = Math.min(maxX-20, Math.max(0, moveX));

    moveY = Math.min(maxY, Math.max(0, moveY));
    setTimeout(function () {
        fish.style.left = moveX + "px";
        // fish.style.top = (moveX-20) + "px";

    }, 400)


}