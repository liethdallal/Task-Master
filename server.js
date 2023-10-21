const express = require('express')
const mongoose = require('./connection')
const homeRouter = require('./routes/homeroutes')



const port = 3000
const app = express()


app.use(express.static(__dirname + '/views')); // Serve static files from the "views" directory


app.set("view engine", "ejs")
//after we grab it we set the view engine to our ejs

//middleware
app.use('/', homeRouter);

app.listen(port, (req, res) => {
    console.log('All linked up ')
})
