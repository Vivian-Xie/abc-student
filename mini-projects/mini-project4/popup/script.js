// https://developer.chrome.com/extensions/messaging
// when the button in the popup window is clicked...

let btn = document.getElementById("start")
let min = document.querySelector("#min")
let sec = document.querySelector("#sec")
let text = document.getElementsByTagName("div")

btn.addEventListener("click", () => {
  console.log("clicked");
  start = true
  countDown()
  chrome.runtime.sendMessage({ message: "btn clicked" }, function (response) {
    console.log("hear from backgr:", response);
      min.innerHTML = response.min;
      sec.innerHTML = response.sec;
  });
  
})

let start = false;
let minutes, seconds;
let maxtime = 10;
function countDown() {
  function CountDown() {
    btn.disabled = "disabled"

    
    if (maxtime >= 0) {
      minutes = parseInt(maxtime / 60 % 60);
      seconds = parseInt(maxtime % 60);
      minutes = size(minutes)
      seconds = size(seconds)
      min.innerHTML = minutes;
      sec.innerHTML = seconds;
      chrome.storage.sync.set({min: minutes,sec:seconds}, function() {
        console.log('Value is set to ' + minutes+":"+seconds);
      });
    }
    else {
      clearInterval(timer);
      maxtime = 10;
      debounce = false
      btn.disabled = ""
    }
    maxtime -= 1;
  }

  timer = setInterval(CountDown, 1000)

}
function size(num) {
  return num < 10 & num >= 0 ? '0' + num : num;
}










