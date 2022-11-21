let coo = document.getElementById("cooperate")
let music = document.getElementById("music")
music.addEventListener("play", () => {
    console.log("played");
    fetch("/getAnswers")
        .then((resFromServer) => {
            return resFromServer.json();
        })
        .then((processedData) => {
            console.log(processedData)
            console.log(processedData.data)
            if (processedData.data) {
                coo.innerHTML = `${processedData.data - 1} People Listening Together`
            }
        })
})