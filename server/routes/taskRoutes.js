const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const Task = require('../models/task');

// Create a new task within a specific list

router.post('/:listId/tasks', authMiddleware, taskController.createTask);


// Update a task
router.put('/:taskId', authMiddleware, taskController.updateTask);

// Delete a task
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

// Swap a task from one list to another
router.put('/:taskId/lists/:newListId', authMiddleware, taskController.swapTaskToList);



module.exports = router;
