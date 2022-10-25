// console.log("Vivian comes.")


let text=document.getElementsByTagName("div")
for (let i=3;i<text.length;i+=2){
    text[i].innerHTML="Go Back to study."
    text[i].style.fontSize="large"
    text[i].style.textAlign="center"
    // document.text[i].styleSheets[0].addClass('spin')
}

// setTimeout(() => {
//     repl("and", "uhduwhuebweu")
// }, 3000)

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(request)
    repl(request.find,request.replace)
});

