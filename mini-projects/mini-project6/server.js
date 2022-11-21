//npm i init ----每次新建
// npm i express ----安装express
// node server.js ----启动方法

// npm i nodemon ----实时刷新改变页面
// nodemon server.js --打开
// 
// fetch 用ajax



console.log("hihi");
//require node module 
const express = require('express')
const app = express()
const port = 3000
let collectedAnswer = [];

// the global file that need to be pushed 
app.use(express.static('accessible'))

app.get('/entrance', (req, res) => {
    console.log("mainpage");

    // if (req.query.password == "yesterday") {
        res.redirect("/player");
        console.log("correct");
    // }
})
let returnData
app.get("/sendAnswer", (req, res) => {
    console.log("answer recieved");
    let info = req.query;
    let newAnswer = info.answer;
    collectedAnswer.push(newAnswer);
    console.log(collectedAnswer);
    returnData=collectedAnswer.length;
})

app.get("/getAnswers", (req, res) => {
    console.log("someone asks for answer", collectedAnswer);
    res.json({ data: returnData });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})