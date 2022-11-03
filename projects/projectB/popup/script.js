let display = document.getElementById("display");
let pause = document.getElementById("pause");


pause.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "pause"});
    });
  })

  display.addEventListener("click", ()=>{
    let optionsForWindow = { 
      url: chrome.runtime.getURL("popup/display.html"), 
      type: "popup", 
      height : screen.height, 
      width : screen.width 
    }

    chrome.windows.create(optionsForWindow); 

})




