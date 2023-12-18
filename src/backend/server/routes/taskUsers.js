// /server/routes/taskUsers.js

const express = require('express');
const router = express.Router();
const taskUsersController = require('../controllers/taskUsersController');

router.get('/', taskUsersController.getAllTaskUsers);
router.get('/users/:id', taskUsersController.getTaskUsersByUserId);
router.get('/tasks/:id', taskUsersController.getUsersByTaskId);

router.put('/:id', taskUsersController.updateTaskUser);

module.exports = router;
