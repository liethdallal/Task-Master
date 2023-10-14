const express = require("express")
const app = express()
const port = 3000

app.listen(port, (req, res) => {
    console.log(`Running on port ${port} ✅ `)
})

app.get('/', (req, res) => {
    res.send("all linked up")
})

console.log("test")

console.log("test2")

