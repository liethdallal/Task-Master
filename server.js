const express = require("express")
const ejs = require("ejs")
const app = express()
const port = 3000

app.listen(port, (req, res) => {
    console.log(`Running on port ${port} ✅ `)
})

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("server.ejs", req.query)
})



