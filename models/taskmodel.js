const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: String
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
