const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const passport = require('../db/passport') 
const Task = require('../models/taskmodel')

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {}
  let sortKey = req.query.sort || 'name'
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err)
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    })
  })
}

router.get('/users', index)

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/profile',
    failureRedirect: '/'
  }
))

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout()
  res.redirect('/users')
})
router.put('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const user = await User.findOne({_id: req.user._id})
    const taskId = req.body.taskId
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    user.tasks.push(task.id)
    await user.save()
    res.redirect(`/profile`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
