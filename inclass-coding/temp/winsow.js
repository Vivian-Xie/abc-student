var lizardImg = chrome.extension.getURL('www.baidu.com');
let lizardWidth=300;
let lizardHeight=500;
var titleBar = 22;

var displays = [];
chrome.system.display.getInfo(function (ds){
  for (var display of ds){
    displays.push(display.bounds);
  }
});

function bodify(win){
  for (var display of displays){
    if (win.left >= display.left && win.left <= display.left + display.width &&
      win.top >= display.top && win.top <= display.top + display.height){

        var update = false;
        if (win.left - display.left < lizardWidth){
          win.left = display.left + lizardWidth;
          update = true;
        }



        var params = {
          left: win.left,
          top: win.top,
          width: win.width,
          height: win.height
        };
        

        if (update){
          chrome.windows.update(win.id, params, function (win){
            appendliz(win);
          });
        } else {
          appendliz(win);
        }
        break;
    }
  }
}

function appendliz(win){

  var lizardTop = win.top + (win.height / 4);
  var lizard = win.left - lizardWidth;
  lizard.moveTo(lizardLeft, lizardTop);
  setTimeout(checkBod, 500);
}



var currentWin;


chrome.windows.getCurrent({}, function (win){
  currentWin = win;
  lizard = window.open(lizardImg, '', 'width=' + lizardWidth + ', height=' + lizardHeight);
});

var refocusing = false;
chrome.windows.onFocusChanged.addListener(function (windowId){
  if ( windowId != -1 && appendageIds.indexOf(windowId) == -1 && !refocusing){
    refocusing = true;
    for (var id of appendageIds){
      chrome.windows.update(id, {focused: true});
    }
    chrome.windows.update(windowId, {focused: true}, function (){
      refocusing = false;
      
      chrome.windows.get(windowId, {}, function (win){
        currentWin = win;
        bodify(win);
      });
    });

  }
});

// ready = false;
// appendageIds = [];
// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
//   appendageIds.push(sender.tab.windowId);
//   if (appendageIds.length >= 5){
//     ready = true;
//   }
// });

function checkBod(){
  chrome.windows.get(currentWin.id, {}, function (win){
    if (win.left != currentWin.left || win.top != currentWin.top ||
      win.width != currentWin.width || win.height != currentWin.height){
        bodify(win);
    } else {
      setTimeout(checkBod, 500);
    }
  });
}

setTimeout(checkBod, 500);