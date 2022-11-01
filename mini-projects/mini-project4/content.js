let text = document.getElementsByTagName("div")
    for (let i = 3; i < text.length; i += 2) {
        text[i].innerHTML = "Go Back to study."
        text[i].style.fontSize = "large"
        text[i].style.textAlign = "center"
        
    }
