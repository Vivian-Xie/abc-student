console.log("Vivian comes.")

let debounce = false;
let start = false;
let text = document.getElementsByTagName("div")
let minutes, seconds;
let maxtime = 10;
function countDown() {
    function CountDown() {
        debounce = true;
        if (maxtime >= 0) {
            minutes = parseInt(maxtime / 60 % 60);
            seconds = parseInt(maxtime % 60);
            minutes = size(minutes)
            seconds = size(seconds)
            // min.innerHTML = minutes;
            // sec.innerHTML = seconds;
        }
        maxtime -= 1;
        
        console.log(minutes, seconds);
    }
    if (!debounce) {
        timer = setInterval(CountDown, 1000)
    }
    if (minutes == '00' && seconds == '00') {
        clearInterval(timer);
        maxtime = 12;
        debounce=false
        // setTimeout(function () {         //添加一个定时器，使秒出现 00 时 再弹出提示框
        //     alert('时间到了');
        // }, 1);                           //1ms
    }
    return { min: minutes, sec: seconds }
}

function size(num) {
    return num < 10 & num >= 0 ? '0' + num : num;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log("background script: GOT MESSAGE:", request)

    if (request.message === "btn_clicked") {
        console.log("message 1 arrived");
        let mytime = countDown();
        start = !start
        
        // console.log("background script: REPLYING:", mytime);
    }
    if (request.message == "start and stop counting") {
        console.log("background script: COUNT WENT UP:", mytime);
        if (typeof mytime !== "undefined"&& mytime.min !== "undefined" && mytime.sec !== "undefined"){
        sendResponse(mytime);
        }else{
            sendResponse({min:0,sec:0})
        }
    }
});

if(start){
for (let i = 3; i < text.length; i += 2) {
    text[i].innerHTML = "Go Back to study."
    text[i].style.fontSize = "large"
    text[i].style.textAlign = "center"
    
}
}
