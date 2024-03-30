const Board = require('../models/board');
const List = require('../models/list');


exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const createdBy = req.user.id; 
    const newBoard = new Board({ title, createdBy });
    const defaultLists = ['To Do', 'In Progress', 'Completed'];
    const createdLists = await Promise.all(defaultLists.map(title => List.create({ title, board: newBoard._id })));
    newBoard.lists = createdLists.map(list => list._id);

    await newBoard.save();

    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ createdBy: req.user.id }).populate('lists');
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getBoardById = async (req, res) => {
  try {
    const boardId = req.params.boardId;


    const board = await Board.findById(boardId).populate('lists');
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updateBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const boardId = req.params.boardId;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    board.title = title;
    await board.save();

    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    await List.deleteMany({ board: boardId });
    await Board.deleteOne({ _id: boardId });

    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
