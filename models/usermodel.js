const mongoose = require('../db/connection');

const TaskSchema = new mongoose.Schema({
  title: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  tasks: [TaskSchema], // Embed tasks directly within the User schema
  googleId: String,
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User