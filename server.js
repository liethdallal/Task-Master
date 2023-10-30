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

// Middleware
app.use(logger('dev')) // Logging middleware before other middlewares
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


// Set up your view engine and views directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Routes
const taskRouter = require("./controllers/taskcontroller")
const userRouter = require("./controllers/usercontroller")
const indexRouter = require("./controllers/indexcontroller")
app.use('/tasks', taskRouter)
app.use('/users', userRouter)
app.use('/', indexRouter)
// Serve static files - This should be placed before defining your routes.
app.use(express.static(__dirname + '/views'))

// Define your routes
app.get('/profile', (req, res) => {
  // Retrieve tasks from your database or wherever you're getting them
  const tasks = []// Retrieve your tasks here

  // Render the 'profile' EJS template and pass the 'tasks' variable
  res.render('profile', { tasks: tasks });
});



// Start the server
app.listen(3000, () => {
  console.log('Listening!')
})