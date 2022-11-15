console.log("hihi");
const express = require('express')
const app = express()
const port = 3000



app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('wwhewhejwejh Hello World!')
})
app.get('/swimmingpool', (req, res) => {
  res.send('water!')
})

console.log(__dirname);
app.get('/treehouse', (req, res) => {
    res.sendFile(__dirname+"/treehouse/index.html")
    //域名传输内容 ？name=var1...
    console.log(req.query);
    // req.query.name=="var1"...
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})