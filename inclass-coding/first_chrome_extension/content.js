console.log("Vivian comes.")

function repl(wordToFind, wordToReplace) {
    console.log("replacing", wordToFind, "with", wordToReplace);
    // use regular expression to find the letter
    let finder = new RegExp(wordToFind, "g");
    // let sentence = "shdfhsuhdjhfgfgs"
    // sentence.replace(finder, "lalala")

    document.body.innerHTML=document.body.innerHTML.replace(finder,wordToReplace)

}

// setTimeout(() => {
//     repl("and", "uhduwhuebweu")
// }, 3000)

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(request)
    repl(request.find,request.replace)
});