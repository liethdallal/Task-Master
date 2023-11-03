const express = require("express")
const mongoose = require("./db/connection")
const logger = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const path = require("path")
const bodyParser = require('body-parser')
const app = express()
require('./db/passport')

app.use(logger('dev')) 

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

const userRouter = require("./controllers/usercontroller")

const indexRouter = require("./controllers/indexcontroller")

app.use('/profile', userRouter)

app.use('/', indexRouter)

app.get('/profile', (req,res) => {
  res.render('profile.ejs')
})

app.listen(3000, () => {
  console.log('Listening!')
})
