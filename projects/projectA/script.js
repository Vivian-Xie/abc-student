let string=[
"Welcome. Welcome.<br>I'm the fortune teller.",
"Guess what? <br>I'm not gonna ask you about your name, you birthday or anything like that.",
"I will be able to know a lot about you<br> by communicating with your digital device.",
"",//3 btn
"",//4 ans
"I doubt whether your IP adress is telling the truth. <br>let me see where you are.",
"",//6 btn
"",//7ans
"OK. Now I want to know about the language you are using.",
"",//9 btn
"",//10 ans
"The next question is how much battery do you have?",
"",
"",
"I'm also interested in your clipboard.",
"",
"",
"That's all the questions I have. <br>Here is the lucky number for you today: <p id='luckyNum'></p>",
""
]


let btnContent=[
"I agree to provide my IP address",
"I agree to provide my geolocation",
"I agree to provide the language for my system",
"I agree to provide my battery information",
"I agree to provide my clipboard Content ",
""

]
let word=document.querySelector(".word")
let btn=document.querySelector(".btn")
let ans=document.querySelector(".ans")
let res=document.querySelector("#result")
let lucky=document.querySelector("#luckyNum")
let count=1;
let btnNum=0;
let check=false;

console.log(ans);

var reallat,reallon;
var iplat,iplon;
var ipaddress,iplanguage,iplancode;
var geocity,batterNum;
window.onclick=function(){
    // console.log(btnNum);
    console.log(count);
    if (check) return
    if (count>0&&count<19){
        if (count%3==0){
            check=true
            btn.innerHTML=btnContent[btnNum]
            ans.innerHTML="......"
            btn.style.display="block"
        }else if(count%3==2){
            ans.style.display="none"
        }
    }
    if (count==18){
        res.innerHTML=Math.floor(Math.random()*50); 
        res.style.opacity="1";
    }
word.innerHTML=string[count]
    count+=1;
}

btn.onclick=function(){
    check=false;
    btn.style.display="none"
    btnNum++;
    if (btnNum>0&&btnNum<7){
        ans.style.display="block"
    }
    if (btnNum==1){
        getIP();
        // console.log(ipaddress,iplanguage)
    }else if(btnNum==2){
        getLocation();
        
    }else if(btnNum==3){
        getLanguage();
        
    }else if(btnNum==4){
        getBattery();
        
    }else if(btnNum==5){
        getClipboardContents();
        
    }
    
        
}




/////btn1
function getIP(){
fetch('https://api.ipregistry.co/?key=tryout')
// fetch('https://api.ip/registry.co/202.66.60.186?key=51n25fgvczbxjdf1')
.then(function (response) {
    return response.json();
})
.then(function (payload) {
    console.log(payload);
    iplat=payload.location.latitude;
    iplon=payload.location.longitude;
    ipaddress= payload.location.country.name
    iplanguage= payload.location.language.name
    iplancode= payload.location.language.code
    
    ans.innerHTML="You are in "+ipaddress+" huh.";
})
.catch((error)=>{
    ans.innerHTML="Oh what's wrong? You computer failed to tell me about that. Please come here later.";

})
}

// /////btn 2
function getLocation() {
    if (navigator.geolocation) {   //检测是否支持地理定位
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        ans.innerHTML = "Oh what's wrong? You computer failed to tell me about that. Please come here later.";
        check=true;
    }
}


function showPosition(position) {
    reallat = position.coords.latitude;
    reallon = position.coords.longitude;
    getCity(reallat,reallon);
}

function getCity(lat, lng) {
    var xhr = new XMLHttpRequest();

    // Paste your LocationIQ token below.
    xhr.open('GET', 'https://us1.locationiq.com/v1/reverse.php?key=pk.5f26a4f164a59aa0819c163e69989b63&lat=' +
        lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            geocity = response.address.road;
            console.log(response);
            if (parseInt(reallat) !== parseInt(iplat) && parseInt(reallon) !== parseInt(iplon)) {
                // console.log(geocity);
                ans.innerHTML = "Caught you! It seems that you are using vpn. <br>Your IP address is in "+ipaddress+", <br>but you are physically on "+geocity+"."

            } else {
                ans.innerHTML = "Am I too suspicious? It's true that you are in" + ipaddress+"."
            }
            return;
        }
    }
}


/////btn 3
function getLanguage(){
    var lang = navigator.userLanguage||window.navigator.language;
    lang=lang.substring(0,2)
    if (lang=='zh'){
        ans.innerHTML="The language you use on your device is Chinese."
    }else if(lang=='en'){
        ans.innerHTML="The language you use on your device is English."

    }
    if (lang==iplancode){
        // console.log(lang==iplancode)
        ans.innerHTML += "<br>Wow, you are using the official language of the land you currently stay on.";
    }else{
            language.innerHTML += "<br>It seems that you are carrying another language with you on this computer.<br> Is it your mother tongue? ";
    }
}

///btn 4
function getBattery(){
navigator.getBattery().then(function(battery) {
    batteryNum = battery.level * 100
    if (batteryNum==100){
        ans.innerHTML="100%? Your energy is starting to overflow!"
    }else if(batteryNum>50){
        ans.innerHTML=batteryNum+"%. Dynamic energy for daily use."
    }else if(batteryNum>20){
        ans.innerHTML=batteryNum+"%. Save your energy. I don't think you will be able to keep energetic for a long time."
    }else if(batteryNum<20){
        ans.innerHTML=batteryNum+"%. Replenish your energy as quickly as possible."
    }

    // var charging = battery.charging ? "yes" : "no";
    // if (charging === "yes"){
    //     document.getElementsByClassName('batteryTime')[0].innerHTML = 'Charging';
    // }else {
    //     document.getElementsByClassName('batteryTime')[0].innerHTML = 'Not Charging';
    // }
})
}


////btn 5

async function getClipboardContents() {
    try {
        const text = await navigator.clipboard.readText();
        console.log('Pasted content: ', text);
        if (text == '') {
            ans.innerText += "It seems that you have nothing in your clipboard."
        } else {
            ans.innerHTML ="You are copying the line below.<br>Where are you going to paste it?<br>" +text;
        }
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        ans.innerText = "It seems that you have nothing in your clipboard."

    }
}

let Width = document.documentElement.clientWidth;
    let Height = document.documentElement.clientHeight;
    for(let i=0;i<227;i++){
        //createElement() 方法通过指定名称创建一个元素
        //1、创建星星
        let Star = document.createElement("span");
        //2、document.body.appendChild(元素)把创建的星星添加到body中
        document.body.appendChild(Star);
        //3、星星的位置随机
        let x = Math.random() * Width;
        let y = Math.random() * Height;
        Star.style.left = x + "px";
        Star.style.top = y + "px";
        //4、随机缩放
        let SuoFang = Math.random() * 2;
        //注意点：`scale(${SuoFang}, ${SuoFang})`这是字符串模板（${}）,不是字符串；
        //字符串用的是"",'',而字符串模板是用反引号``来包裹。
        Star.style.transform = `scale(${SuoFang}, ${SuoFang})`;
        //5、随机动画延迟
        let rate = Math.random() * 2;
        //CSS中的animation-delay设置延迟
        Star.style.animationDelay = rate + "s";    //延迟，事件单位为秒"s"
    }
      