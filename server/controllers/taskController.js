const Task = require('../models/task');
const List = require('../models/list'); 

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const { listId } = req.params; 
    const createdBy = req.user.id; 

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const newTask = new Task({ 
      title, 
      description, 
      dueDate, 
      priority, 
      list: listId,
      createdBy 
    }); 
    await newTask.save();

    list.tasks.push(newTask._id);
    await list.save();

    const updatedList = await List.findById(listId).populate('tasks');

    res.status(201).json({ newTask, updatedList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


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


