let tags = document.getElementsByTagName("a");
let eatenOnes = [];
let tongue=document.createElement('div');
document.body.appendChild(tongue);
tongue.className="tongue";


window.resizeTo(
  window.screen.availWidth / 2,
  window.screen.availHeight / 2
);
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
  if (tags[i].textContent != "") {
    tags[i].addEventListener("mouseover", (e) => {
      
      
      eatenOnes.push({
        text: tags[i].textContent,
        link: tags[i].href
      });
      // console.log(eatenOnes);
      // setTimeout(() => {
      //   tags[i].style.visibility = "hidden";
      //   tags[i].style.pointerEvents = "none";
      // }, 500);

      console.log("Leon's method"+getOffset(tags[i]).left+"+"+getOffset(tags[i]).top);
      // console.log(getOffset(tags[i]).left + "+" + getOffset(tags[i]).top);
      // set the initial pos of the tongue
      let tagX=getOffset(tags[i]).left+getOffset(tags[i]).width/2;
      let tagY=getOffset(tags[i]).top+getOffset(tags[i]).height/2;

      // can be changed according to the lizard
      let tongueX=0;
      let tongueY=window.innerHeight/2;
      // var c = Math.sqrt( a*a + b*b );
      let a = tagX - tongueX;
      let b = tagY - tongueY;
      let tongueLength = Math.sqrt(a*a + b*b)
      // tongueHeight=tongueHeight-lizHead;
      // console.log("Vivian's lizard tongue"+tongueWidth+"+"+tongueHeight);
      tongue.style.backgroundImage.size="100%"
      // console.log(Math.atan(tongueWidth/tongueHeight));
      // console.log("rotation angle is "+(Math.atan(tongueWidth/tongueHeight))*180/Math.PI);
      
      // rotation center and angle
      tongue.style.transformOrigin="0 50%"
      tongue.style.width=tongueLength+"px"
      // tongue.style.width=(tongxueWidth**2+tongueHeight**2)*0.5+"px";

      // angle between two points:  Math.atan2(p2.y - p1.y, p2.x - p1.x);
      let angle = (Math.atan2(tagY-tongueY, tagX-tongueX)) * 180 / Math.PI;
      // tags[i].innerHTML+=angle;
      tongue.style.transform="rotate("+angle+"deg)"
      chrome.runtime.sendMessage(
        { msg: eatenOnes }
      );
    })
    
  }
}
        // x = e.clientX
        // y = e.clientY
    //     console.log(x,y);
    // var moveX = e.clientX - x; //得到距离左边距离
    // var moveY = e.clientY - y; //得到距离上边距离
    // var maxX = document.documentElement.clientWidth - fish.offsetWidth;
    // var maxY = document.documentElement.clientHeight - fish.offsetHeight;
    // moveX = Math.min(maxX-20, Math.max(0, moveX));
    // moveY = Math.min(maxY, Math.max(0, moveY));
    // tags[i].style.left = moveX + "px";
    // tags[i].style.top = moveY + "px";
