const express = require('express');
const Task = require('../models/taskmodel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('profile', { tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/add', async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/users', async (req, res) => {
  const { title } = req.body;

  try {
    // Add your task creation logic here
    const newTask = new Task({ title });
    await newTask.save();

    // Redirect to the appropriate page (e.g., the task list)
    res.redirect('/tasks');
  } catch (error) {
    console.error('Error adding task:', error);
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
