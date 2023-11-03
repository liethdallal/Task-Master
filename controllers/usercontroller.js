const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const passport = require('../db/passport') 

function index(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = req.user; 
  res.render('users/index', {
    user: req.user, 
  });
}

router.get('/users', index)

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user; 
    res.render('profile', { user });
  } else {
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ _id: req.user._id });
    const taskTitle = req.body.title; 

    user.tasks.push({ title: taskTitle });

    await user.save();

    res.redirect('/profile'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/remove/:taskId', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const taskId = req.params.taskId;
    
    const user = await User.findOne({ _id: req.user._id });

    const taskToRemove = user.tasks.find((task) => task._id.toString() === taskId);

    if (!taskToRemove) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskIndex = user.tasks.indexOf(taskToRemove);
    if (taskIndex !== -1) {
      user.tasks.splice(taskIndex, 1);
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    await user.save();

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

