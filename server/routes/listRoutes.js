const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/:boardId/lists', authMiddleware, listController.createList);
router.delete('/lists/:listId', authMiddleware, listController.deleteList);
router.get('/:boardId/lists', authMiddleware, listController.getAllLists);
router.get('/lists/:listId/tasks', authMiddleware, listController.getTasksForList);

module.exports = router;
