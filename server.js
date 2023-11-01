const express = require("express")
const mongoose = require("./db/connection")
const Task = require('./models/taskmodel')
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

app.get('/profile', async (req, res) => {
  try {
    // Retrieve tasks from your database using Mongoose or your data source
    const tasks = await Task.find().populate('user');
    if (req.isAuthenticated()) {
      // Retrieve the authenticated user
      const user = req.user;

      // Add the retrieved tasks to the user's 'tasks' array
      user.tasks = tasks;

      // Save the user document to persist the changes in the database
      await user.save();
    }
    // Render the 'profile' EJS template and pass the 'tasks' variable
    res.render('profile', { tasks: tasks });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start the server
app.listen(3000, () => {
  console.log('Listening!')
})

//Needs adjusting