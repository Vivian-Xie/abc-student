let tags = document.getElementsByTagName("a");
let eating = true;
let tongue=document.createElement('div');
document.body.appendChild(tongue);
tongue.className="tongue";
let liz=document.createElement('div');
document.body.appendChild(liz);
liz.className="liz";
// let photo=document.createElement('img');
// liz.appendChild(photo)
// photo.src="https://vivian-xie.github.io/abc-student/projects/tongue2.png"
let start=false;

const sound = document.createElement("audio");
const wav = chrome.runtime.getURL("sound.wav");

sound.src = wav;


document.body.insertBefore(sound, document.body.firstElementChild);


const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
}
console.log(eating+"default")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("received");
    if (request.msg == "pause") {
        eating = false;
        console.log(eating+"after clicked false");
    }else{
        eating = true;
        console.log(eating+"unclicked true");
    }
})

  
console.log(eating+"looping true");
for (let i = 0; i < tags.length; i++) {
    if (tags[i].textContent != "") {
        tags[i].addEventListener("mouseover", () => {
            if(eating == true){
                if (start) return
                start=true
                if (tags[i].classList.contains("lizardHasEatenThis") == false) {
                    let eatenLink = {
                        text: tags[i].textContent,
                        link: tags[i].href
                    }
                    setTimeout(()=>{
                    sound.play()
                    tags[i].style.visibility = "hidden";
                    tags[i].style.pointerEvents = "none";
                    tags[i].classList.add("lizardHasEatenThis");
                    }, 300);

                    let tagX=getOffset(tags[i]).left+getOffset(tags[i]).width/2;
                    let tagY=getOffset(tags[i]).top+getOffset(tags[i]).height/2;
                    console.log(getOffset(tags[i]).left + "+" + getOffset(tags[i]).top);
                    
                    console.log("after calculation "+tagX+tagY);
        
                    let tongueX=20;
                    // can be changed according to the lizard
                    let tongueY=window.innerHeight/2;
                    let a = tagX - tongueX-101;
                    let b = tagY - tongueY; 
                    if (tagX==0&&tagY==0) {
                        // console.log("jumped out");
                      start=false
                      return
                    }
                    // keep the tongue grow and shrink according to the pos of a,b
                    let tongueLength = Math.sqrt(a*a + b*b)                    
                      tongue.style.backgroundImage.size="100%"
                      tongue.style.transformOrigin="0% 50%"
                      liz.style.backgroundImage.size="100%"
                      liz.style.transformOrigin="0% 50%"
                      liz.style.left="0px"
                      tongue.style.left="80px"
                      
                      setTimeout(()=>{
                          tongue.style.width=tongueLength+"px"
                          liz.style.left="10px"
                            tongue.style.left="101px"
                            tongue.style.opacity=1
                        },300)
                        setTimeout(()=>{
                            // tongue.style.left="0px"
                            tongue.style.width="0px"
                            tongue.style.left="80px"
                            liz.style.left="-100px"
                            tongue.style.opacity=0
                        start=false
                      },1000)
             
                    let angle = (Math.atan2(b, a)) * 180 / Math.PI;
                    // tags[i].innerHTML+=angle;
                    tongue.style.transform="rotate("+angle+"deg)"
                    chrome.runtime.sendMessage({ type: 'ate a link', content: eatenLink });

                }
            }
        })

    }
}

