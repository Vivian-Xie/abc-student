console.log(window);
let button = document.querySelector("#button")
let popUpWidth = 100
let popUpHeight = 100
function openSingleWindow(n){
    for (let i=0;i<n;i++){

        let ranX = Math.random() * screen.width - popUpWidth;
        let ranY = Math.random() * screen.height - popUpHeight;
        let win = window.open("", "", "width=20,height=100,left=" + ranX + ",top=" + ranY)
        function closeWindow() {
            win.close()
        }
        setTimeout(closeWindow, 2000)
    }

}
button.addEventListener("click", () => {
    console.log("button clicked");
    openSingleWindow(20)
})
