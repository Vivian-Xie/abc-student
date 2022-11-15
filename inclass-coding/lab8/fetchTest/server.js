//npm i init ----每次新建
// npm i express ----安装express
// node server.js ----启动方法

// npm i nodemon ----实时刷新改变页面
// nodemon server.js --打开
// 
// fetch 用ajax



console.log("hihi");
const { response } = require('express');
//require node module 
const express = require('express')
const app = express()
const port = 3000
let collectDes = []

// the global file that need to be pushed 
app.use(express.static('accessible'))

app.get('/newDes', (req, res) => {
    res.send('Hello World!')
    let info = req.query
    // console.log(info);
    //   console.log("got new Des");
    let newDest=info.des
    // 全部储存起来，在一个数组里
    collectDes.push(newDest)
    console.log(collectDes);
})
app.get('/getDes', (req, res) => {
    console.log("receive new info",collectDes);
    // res.send("viviansent")
    res.json({data:collectDes,name:"vivian"})
   
})
// app.get('/swimmingpool', (req, res) => {
//   res.send('water!')
// })

// console.log(__dirname);
// app.get('/treehouse', (req, res) => {
//     res.sendFile(__dirname+"/treehouse/index.html")
//     //域名传输内容 ？name=var1...
//     console.log(req.query);
//     // req.query.name=="var1"...
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})