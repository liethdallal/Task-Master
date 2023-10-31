const mongoose = require('../db/connection');

const taskSchema = new mongoose.Schema({
  title: String,
  // Reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;