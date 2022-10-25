let btnup=document.getElementById("up")
let counterDisplay=document.getElementById("counterDisplay")

//  get number from storage
chrome.storage.local.get(['myCount'],function(result){
    console.log("the count in the local storage is "+result.myCount);
    count=result.count;

    // store the 0 count for the first time
    if(result.count == undefined){
        count = 0;
        chrome.storage.local.set({myCount: count}, ()=>{
            console.log("success! local storage stored", count);
        })
    }
})

let counter=0;
btnup.addEventListener("click",()=>{
    counter++;
    counterDisplay.innerHTML=counter

    //tell background script that we increase the count 
    chrome.runtime.sendMessage ({message:"count went up"},function(response){
        
    })
})
chrome.runtime.sendMessage ({message:"remind me of the count"},function(response){
    console.log("finally receiving",response);
    counterDisplay.innerHTML=response.theCount
    counter=response.theCount;
})