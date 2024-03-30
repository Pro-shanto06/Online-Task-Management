const Board = require('../models/board');
const List = require('../models/list');

// Create a new board with default lists
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const createdBy = req.user.id; // Assuming user ID is attached to request object after authentication

    // Create a new board
    const newBoard = new Board({ title, createdBy });

    // Create default lists
    const defaultLists = ['To Do', 'In Progress', 'Completed'];
    const createdLists = await Promise.all(defaultLists.map(title => List.create({ title, board: newBoard._id })));

    // Add default lists to the board
    newBoard.lists = createdLists.map(list => list._id);

    // Save the board
    await newBoard.save();

    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all boards for a user
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ createdBy: req.user.id }).populate('lists');
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a board by ID
exports.getBoardById = async (req, res) => {
  try {
    const boardId = req.params.boardId;

    // Find the board by ID
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

// Update a board
exports.updateBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const boardId = req.params.boardId;
    
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Update board title
    board.title = title;
    await board.save();

    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a board
exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Delete associated lists
    await List.deleteMany({ board: boardId });

    // Delete the board
    await Board.deleteOne({ _id: boardId });

    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
