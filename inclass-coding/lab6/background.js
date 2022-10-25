console.log("Vivian is making an extension");
let count = 12345;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //   console.log(sender.tab ?
        //               "from a content script:" + sender.tab.url :
        //               "from the extension");
        //               console.log(request);

        // The line below shows who is the message coming from
        // if (sender.tab == true){
        //     console.log("from a content script:"+sender.tab.url);
        // }else{
        //     console.log("from the extension");
        // }
        // console.log(request);

        if (request.message === "remind me of the count"){
            sendResponse({ theCount: count });
        }else if (request.message=="count went up"){
            count++;
        }
    }
);