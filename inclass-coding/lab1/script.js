let range =document.querySelector("#myRange")
let valueField=document.querySelector("#valueField")
let content=document.querySelector("#content")
// console.log(content);
let text=content.innerHTML
let letters=text.split("")


// console.log(letters);
// let spans=letters.map(function(singleLetter){
//     let spanString="<span>"+singleLetter+"</span>";
//     return spanString
// })
// content.innerHTML=spans.join("")
// let spantAGS=DOCUMENT.getElementByID("span")
// range.addEventListener("input",function(){
//     let value=range.value
//     console.log(value);
//     for (let i=0; i<spanTags.length;i++){
//         // spanTags.style.left
//     }
// })



function changeHappened(){
    console.log("change happened");
}

    range.addEventListener("change",changeHappened)

function inputHappened(){
    console.log("input Happened");
    // let value=range.value;
    valueField.innerHTML=range.value;
    valueField.style.left=range.value*2+"px";
    range.style.left=-range.value+"px"
}

range.addEventListener("input",inputHappened)