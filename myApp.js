let express = require('express');
const path = require('path');
let app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "views", "index.html"));
})


app.get("/json", (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

app.get('/now', function(req, res, next) {
    req.now = new Date();
    next(); 
}, function(req, res) {
    const currentTime = req.now.toISOString();
    res.send({time: currentTime});
});

app.get('/:word/echo',(req,res)=>{
    const word = req.params.word;
    res.send({echo: word})
})

app.get('/name',(req,res)=>{
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.send({ name: `${firstName} ${lastName}` })
})

app.post('/name',(req,res)=>{
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.send({ name: `${firstName} ${lastName}` })
})



 module.exports = app;
