const express = require("express")
const ejs = require("ejs")
const app = express()
const port = 3000
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(express.static(__dirname + '/views'));
//We are looking in to the entire folder views to be able to grab the css along with our html

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('homepage')
})
app.get('/login', (req, res) => {
    res.render('signin');
   });

app.listen(port, (req, res) => {
    console.log(`Running on port ${port} ✅ `)
})


