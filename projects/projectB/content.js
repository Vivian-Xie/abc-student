let tags = document.getElementsByTagName("a");
let eatenOnes = [];
let tongue=document.createElement('div');
document.body.appendChild(tongue);
tongue.className="tongue";
tongue.style.transform="skew(30deg)"

for (let i = 0; i < tags.length; i++) {
  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }
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
      // console.log(getOffset(tags[i]).left + "+" + getOffset(tags[i]).top);
      // var tongueWidth=getOffset(tags[i]).left;
      // var tongueHeight=getOffset(tags[i]).top;
      var tongueWidth=e.clientX;
      var tongueHeight=e.clientY;
      console.log("tongue"+tongueWidth+"+"+tongueHeight);
      console.log(window.outerHeight);
      // can be changed according to the lizard
      tongueHeight=Math.abs(tongueHeight-window.outerHeight/2);
      tongue.style.width=(tongueWidth+30)+"px";
      // console.log(tongueWidth+"px");
      tongue.style.backgroundImage.size="100%"
      console.log(Math.atan(tongueWidth/tongueHeight));
      tongue.style.transformOrigin="0 30%"
      tongue.style.transform="rotate("+Math.atan(-tongueWidth/tongueHeight)*180/Math.PI+"deg)"
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
