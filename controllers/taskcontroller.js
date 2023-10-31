const express = require('express');
const Task = require('../models/taskmodel');
const User = require('../models/userModel'); // Import the User model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Populate the 'user' field to get the associated user for each task
    const tasks = await Task.find().populate('user');
    res.render('profile', { tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/add', async (req, res) => {
  const { title, userId } = req.body; // Include the user ID when creating a task

  try {
    const newTask = new Task({ title, user: userId });
    await newTask.save();

    // Redirect to the task list page
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/delete/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndRemove(taskId);
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

