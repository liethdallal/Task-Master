const express = require('express')
const homeRouter  = express.Router()


homeRouter.get('/', (req, res) => {
    res.render('homepage')
})

homeRouter.get('/login', (req, res) => {
    res.render('signin');
   });

module.exports = homeRouter