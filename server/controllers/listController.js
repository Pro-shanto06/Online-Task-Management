const List = require('../models/list');
const Board = require('../models/board');
const Task = require('../models/task');

// Create a new list in a specific board
exports.createList = async (req, res) => {
    try {
      const { title } = req.body;
      const boardId = req.params.boardId;
  
      // Check if the board exists
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      // Create the list
      const newList = new List({ title, board: boardId });
      await newList.save();
  
      // Add the list to the board's lists array
      board.lists.push(newList._id);
      await board.save();
  
      res.status(201).json(newList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};




// Delete a list
exports.deleteList = async (req, res) => {
  try {
    const listId = req.params.listId;

    // Find the list by ID
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Remove the list from its associated board
    const board = await Board.findById(list.board);
    if (board) {
      board.lists = board.lists.filter(id => id.toString() !== listId);
      await board.save();
    }

    // Delete the list
    await List.deleteOne({ _id: listId });

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




// Get all lists for a specific board
exports.getAllLists = async (req, res) => {
    try {
        const boardId = req.params.boardId;

        // Find all lists associated with the given boardId and populate their tasks
        const lists = await List.find({ board: boardId }).populate('tasks');

        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getTasksForList = async (req, res) => {
  try {
    const listId = req.params.listId;

    // Find the list by ID and populate its tasks
    const list = await List.findById(listId).populate('tasks');

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Retrieve tasks associated with the list from the Task model
    const tasks = await Task.find({ list: listId });

    // Add newly added tasks to the list's tasks array
    list.tasks = tasks;

    res.json(list.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  
