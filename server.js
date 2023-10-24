const express = require('express');
const mongoose = require('mongoose'); // Add Mongoose
const app = express();
const path = require('path');
const taskRoutes = require('./controllers/taskcontroller');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/tasks', taskRoutes);
app.use('/', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
