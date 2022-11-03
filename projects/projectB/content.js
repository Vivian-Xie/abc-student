let tags = document.getElementsByTagName("a");
let eatenOnes = [];
let tongue=document.createElement('div');
document.body.appendChild(tongue);
tongue.className="tongue";
let liz=document.createElement('div');
document.body.appendChild(liz);
liz.className="liz";
let start=false;

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}

for (let i = 0; i < tags.length; i++) {
  
  // find out which tags are actualy relevant (eg not empty strings)
  if (tags[i].textContent != ""&&tags[i].innerHTML != "") {
    tags[i].addEventListener("mouseover", (e) => {
      if (start) return
      start=true
      eatenOnes.push({
        text: tags[i].textContent,
        link: tags[i].href
      });
      // console.log(eatenOnes);
      setTimeout(() => {
        tags[i].style.visibility = "hidden";
        tags[i].style.pointerEvents = "none";
      }, 1000);

      // console.log(getOffset(tags[i]).left + "+" + getOffset(tags[i]).top);
      // set the initial center pos of the link the lizard will eat
      let tagX=getOffset(tags[i]).left+getOffset(tags[i]).width/2;
      let tagY=getOffset(tags[i]).top+getOffset(tags[i]).height/2;
      console.log("Leon's method"+tagX+"+"+tagY);
      
      let tongueX=0;
      // can be changed according to the lizard
      let tongueY=window.innerHeight/2;
      let a = tagX - tongueX-20;
      let b = tagY - tongueY; 
      if (tagX==0&&tagY==0) {
        start=false
        return
      }
      console.log("after cal"+a+"+"+b);
      // keep the tongue grow and shrink according to the pos of a,b
      let tongueLength = Math.sqrt(a*a + b*b)
      // console.log("rotation angle is "+(Math.atan(tongueWidth/tongueHeight))*180/Math.PI);
      
      // rotation center and angle
      // if(a==0&&b==0){
        
        tongue.style.backgroundImage.size="100%"
        tongue.style.transformOrigin="0% 50%"
        liz.style.backgroundImage.size="100%"
        liz.style.transformOrigin="0% 50%"
        liz.style.left="0px"
        tongue.style.marginLeft="101px"
        setTimeout(()=>{
          tongue.style.width=tongueLength+"px"
          liz.style.left="10px"
          
        },500)
        setTimeout(()=>{
          tongue.style.marginLeft="0px"
          tongue.style.width="0px"
          liz.style.left="-100px"
          start=false
        },1000)
        // tongue.style.width=(tongxueWidth**2+tongueHeight**2)*0.5+"px";
        
        // angle between two points:  Math.atan2(p2.y - p1.y, p2.x - p1.x);
     

    
      let angle = (Math.atan2(b, a)) * 180 / Math.PI;
      // tags[i].innerHTML+=angle;
      tongue.style.transform="rotate("+angle+"deg)"
      chrome.runtime.sendMessage(
        { msg: eatenOnes }
        );
      // }else{
      //   start=false
      // }
    })
    
  }
}
  
