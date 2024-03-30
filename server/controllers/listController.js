const List = require('../models/list');
const Board = require('../models/board');
const Task = require('../models/task');


exports.createList = async (req, res) => {
    try {
      const { title } = req.body;
      const boardId = req.params.boardId;
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const newList = new List({ title, board: boardId });
      await newList.save();
  
      board.lists.push(newList._id);
      await board.save();
  
      res.status(201).json(newList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    const board = await Board.findById(list.board);
    if (board) {
      board.lists = board.lists.filter(id => id.toString() !== listId);
      await board.save();
    }

    await List.deleteOne({ _id: listId });

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getAllLists = async (req, res) => {
    try {
        const boardId = req.params.boardId;
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
    const list = await List.findById(listId).populate('tasks');

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    const tasks = await Task.find({ list: listId });
    list.tasks = tasks;

    res.json(list.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  
