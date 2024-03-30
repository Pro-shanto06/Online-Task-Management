const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, boardController.createBoard);
router.get('/', authMiddleware, boardController.getAllBoards);
router.get('/:boardId', authMiddleware, boardController.getBoardById);
router.put('/:boardId', authMiddleware, boardController.updateBoard);
router.delete('/:boardId', authMiddleware, boardController.deleteBoard);

module.exports = router;
