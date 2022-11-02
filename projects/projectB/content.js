let tags = document.getElementsByTagName("a");
let eatenOnes = [];
let tongue=document.createElement('div');
document.body.appendChild(tongue);
tongue.className="tongue";


function createWindow(src, width, height){
  var win = window.open(src, "_new", "width="+width+",height="+height);
  win.addEventListener("resize", function(){
    console.log("Resized");
    win.resizeTo(width, height);
  });
}
  //create the lizard
  createWindow("about:blank", 300, 400);




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
      setTimeout(() => {
        tags[i].style.visibility = "hidden";
        tags[i].style.pointerEvents = "none";
      }, 500);

      console.log("Leon's method"+getOffset(tags[i]).left+"+"+getOffset(tags[i]).top);
      // console.log(getOffset(tags[i]).left + "+" + getOffset(tags[i]).top);
      // set the initial center pos of the link the lizard will eat
      let tagX=getOffset(tags[i]).left+getOffset(tags[i]).width/2;
      let tagY=getOffset(tags[i]).top+getOffset(tags[i]).height/2;

      let tongueX=0;
      // can be changed according to the lizard
      let tongueY=window.innerHeight/2;
      let a = tagX - tongueX;
      let b = tagY - tongueY; 
      // keep the tongue grow and shrink according to the pos of a,b
      let tongueLength = Math.sqrt(a*a + b*b)
      // console.log("rotation angle is "+(Math.atan(tongueWidth/tongueHeight))*180/Math.PI);
      
      // rotation center and angle
      tongue.style.backgroundImage.size="100%"
      tongue.style.transformOrigin="0 50%"

      tongue.style.width=tongueLength+"px"
      setTimeout(()=>{
        tongue.style.width="0px"
        
      },500)
      // tongue.style.width=(tongxueWidth**2+tongueHeight**2)*0.5+"px";

      // angle between two points:  Math.atan2(p2.y - p1.y, p2.x - p1.x);
      let angle = (Math.atan2(tagY-tongueY, tagX-tongueX)) * 180 / Math.PI;
      // tags[i].innerHTML+=angle;
      tongue.style.transform="rotate("+angle+"deg)"

    })
    
  }
}
