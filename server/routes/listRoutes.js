const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new list in a specific board
router.post('/:boardId/lists', authMiddleware, listController.createList);


// Delete a list
router.delete('/lists/:listId', authMiddleware, listController.deleteList);

// Get all lists for a specific board
router.get('/:boardId/lists', authMiddleware, listController.getAllLists);

router.get('/lists/:listId/tasks', authMiddleware, listController.getTasksForList);

module.exports = router;
