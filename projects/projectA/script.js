let string=[
"Welcome. Welcome.<br>I'm the fortune teller.",
"Guess what? <br>I'm not gonna ask you about your name, you birthday or anything like that.",
"I will be able to know a lot about you<br> by communicating with your digital device.",
"",//3 btn
"",//4 ans
"I doubt whether your IP adress is telling the truth. <br>let me see where you are.",
"",//6 btn
"",//7ans
"OK. Now I will learn about the language you are using.",
"",//9 btn
"",//10 ans
"The next question is how much battery do you have?",
"",
"",

]


let btnContent=[
"I agree to provide my IP address",
"I agree to provide my geolocation",
"I agree to provide the language for my system"

]
let word=document.querySelector(".word")
let btn=document.querySelector(".btn")
let ans=document.querySelector(".ans")
let count=1;
let btnNum=0;
let check=false;

console.log(ans);

var reallat,reallon;
var iplat,iplon;
var ipaddress,iplanguage,iplancode;
var geocity,batterNum;
window.onclick=function(){
    console.log(btnNum);
    if (check) return
    if (count>0){
        if (count%3==0){
            check=true
            btn.innerHTML=btnContent[btnNum]
            btn.style.display="block"
        }else if(count%3==2){
            ans.style.display="none"
        }
    }
word.innerHTML=string[count]
    count+=1;

}

btn.onclick=function(){
    check=false;
    btn.style.display="none"
    btnNum++;
    if (btnNum>0){
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
        
    }
        
}




/////btn1
function getIP(){
fetch('https://api.ipregistry.co/202.66.60.186?key=51n25fgvczbxjdf1')
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
                ans.innerHTML = "Am I too suspicious? It's true that you are in" + ipaddress+" ."
            }
            return;
        }
    }
}


/////btn 3
function getLanguage(){
    var lang = navigator.userLanguage||window.navigator.language;
    if (lang.substring(0,2)==iplancode){
        ans.innerHTML = "Wow, you are using the official language of the land you are staying.";
    }else{
            language.innerHTML = "It seems that you are carrying another language with you on this computer. Will";
    }
}

///btn 4
function getBattery(){
navigator.getBattery().then(function(battery) {
    batteryNum = battery.level * 100
    if (batteryNum==100){
        ans.innerHTML="100%? I see the energy burning actively."
    }else if(batteryNum>50&&batteryNum<100){
        ans.innerHTML="Medium "
    }

    var charging = battery.charging ? "yes" : "no";
    if (charging === "yes"){
        document.getElementsByClassName('batteryTime')[0].innerHTML = 'Charging';
    }else {
        document.getElementsByClassName('batteryTime')[0].innerHTML = 'Not Charging';
    }
})
}
      