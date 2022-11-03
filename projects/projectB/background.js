
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    let eaten = request.content;
    chrome.storage.local.get({ linkArray:[] }, function(items) {
      items.linkArray.push((eaten)); 
      chrome.storage.local.set(items);
  })
})

chrome.action.onClicked.addListener((tab) => {

  chrome.tabs.query({}, (tabs) => tabs.forEach( tab =>  
    chrome.scripting.executeScript({target: { tabId: tab.id },files: ['content.js']}))
  )
});
