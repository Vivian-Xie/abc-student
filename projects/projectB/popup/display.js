chrome.storage.local.get(['linkArray'], function (result) {
  

    if (result.linkArray == "undefined") {
        document.getElementById("text").innerHTML = "empty now";
    } else {
        for (let i = 0; i < result.linkArray.length; i++) {
            let a = document.createElement('a');
            let linkText = document.createTextNode(result.linkArray[i].text);
            a.appendChild(linkText);
            a.title = result.linkArray[i].text+'<br>/<br>';
            a.href = result.linkArray[i].link;
            const top = Math.floor(Math.random() * 700) 
            const left = Math.floor(Math.random() * 1200) 
            a.style.top = top + 'px'
            a.style.left = left + 'px'
            document.getElementById('text').appendChild(a);
        }
    }
});


