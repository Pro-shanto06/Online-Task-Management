const Task = require('../models/task');
const List = require('../models/list'); // Import List model

// Create a new task within a specific list
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const { listId } = req.params; // Extract listId from URL params
    const createdBy = req.user.id; // Assuming user ID is attached to request object after authentication

    // Find the list by its ID
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Create a new task associated with the list
    const newTask = new Task({ 
      title, 
      description, 
      dueDate, 
      priority, 
      list: listId, // Set the list ID to associate the task with the list
      createdBy 
    }); 
    await newTask.save();

    // Push the task's ID to the tasks array of the associated list
    list.tasks.push(newTask._id);
    await list.save();

    // Fetch the updated list with populated tasks
    const updatedList = await List.findById(listId).populate('tasks');

    res.status(201).json({ newTask, updatedList }); // Return the new task and updated list
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};





// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = completed ?? task.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Swaps a task from one list to another
exports.swapTaskToList = async (req, res) => {
  try {
    const { taskId, newListId } = req.params;

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's list ID to the new list ID
    task.list = newListId;

    // Save the updated task
    await task.save();

    res.json({ message: 'Task swapped to new list successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
