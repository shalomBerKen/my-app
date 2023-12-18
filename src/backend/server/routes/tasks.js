// /server/routes/tasks.js

const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.get('/:id/users', tasksController.getTaskUsers); 

router.post('/', tasksController.createTask);

router.put('/:id', tasksController.updateTask);

module.exports = router;
