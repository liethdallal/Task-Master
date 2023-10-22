// models/Task.js
const tasks = [];

class Task {
  constructor(title) {
    this.id = tasks.length + 1;
    this.title = title;
  }

  save() {
    tasks.push(this);
  }

  static getAll() {
    return tasks;
  }
}

module.exports = Task;