// controllers/taskController.js
const express = require('express');
const Task = require('../models/taskmodel');
const router = express.Router();

router.get('/', (req, res) => {
  const tasks = Task.getAll();
  res.render('homepage', { tasks });
});

router.post('/add', (req, res) => {
  const { title } = req.body;
  const newTask = new Task(title);
  newTask.save();
  res.redirect('/tasks');
});

module.exports = router;