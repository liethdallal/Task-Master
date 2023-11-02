const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const passport = require('../db/passport') 

function index(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = req.user; // The authenticated user
  res.render('users/index', {
    user: req.user, // Pass the user object to the template
  });
}

router.get('/users', index)

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user; // Ensure req.user contains the user data
    res.render('profile', { user });
  } else {
    // Handle the case where the user is not authenticated (redirect to login, show an error, etc.)
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ _id: req.user._id });
    const taskTitle = req.body.title; // Get the task title from the form input

    // Create a new task and add it to the user's tasks array
    user.tasks.push({ title: taskTitle });

    // Save the updated user with the new task
    await user.save();

    res.redirect('/profile'); // Redirect back to the profile page
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router
