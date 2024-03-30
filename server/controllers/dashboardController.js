// controllers/dashboardController.js

const Task = require('../models/task');

// Get user dashboard data
const getUserDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const pendingTasks = totalTasks - completedTasks;

    // Calculate other metrics and upcoming deadlines as needed

    res.json({ totalTasks, completedTasks, pendingTasks });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getUserDashboard };
