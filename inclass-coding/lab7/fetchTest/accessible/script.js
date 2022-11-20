console.log("This is a new page");

let button=document.getElementById("btn")
let input=document.getElementById("inputt")
let getDataButton=document.getElementById("getData")


// 定向自己收级server里的数据
getDataButton.addEventListener("click",()=>{
    fetch("getDes").then((responseFromServer)=>{
        console.log(responseFromServer);
        return responseFromServer.json()
    }).then((processedData)=>{
        // .data是json里你想要的那一项
        console.log(processedData.data);
        let newappend=processedData.data
        // 为新收到的data里的每一项建一个页面<p>
        newappend.forEach((des)=>{
            let p=document.createElement("p")
            p.innerHTML=des
            document.body.appendChild(p)
        })
    })
})

// 把数据送到server里

button.addEventListener("click",()=>{
    let destination=input.value;
    console.log(destination);
    // send this value to the server
    let route='newDes?des='+destination
    fetch(route)
    input.value=""
})
