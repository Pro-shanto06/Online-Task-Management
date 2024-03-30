const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new board
router.post('/', authMiddleware, boardController.createBoard);

// Get all boards for a user
router.get('/', authMiddleware, boardController.getAllBoards);

// Get a specific board by ID
router.get('/:boardId', authMiddleware, boardController.getBoardById);

// Update a board
router.put('/:boardId', authMiddleware, boardController.updateBoard);

// Delete a board
router.delete('/:boardId', authMiddleware, boardController.deleteBoard);

module.exports = router;
