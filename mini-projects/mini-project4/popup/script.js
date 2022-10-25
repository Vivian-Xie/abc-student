// https://developer.chrome.com/extensions/messaging
// when the button in the popup window is clicked...

let btn=document.getElementById("start")
var maxtime = 25 * 60;
let min= document.querySelector("#min")
let sec= document.querySelector("#sec")

btn.addEventListener("click", ()=>{
  // we retrieve the values in the text inputs:
  setInterval(
    function CountDown() {
    console.log("go"); 
     if (maxtime >= 0) {
        minutes = Math.floor(maxtime / 60);
         seconds = Math.floor(maxtime % 60);
         minutes=size(minutes)
         seconds=size(seconds)
         min.innerHTML = minutes;
         sec.innerHTML = seconds;
     }else{
      
     }
  }, 1000);

function size(num) {
  return num < 10 & num >= 0 ? '0' + num : num;
}  
  // now we ask the browser what the currently active tab in the active window is:
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   let text=document.getElementsByTagName("span")
  //   for (let i=0;i<text.length;i++){
  //       text[i].innerHTML="Go Back to study."
  //       text[i].style.fontSize="large"
  //   }
  // });
})





