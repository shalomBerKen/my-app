// /server/routes/tasks.js

const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const communitiesTasksController = require('../controllers/communitiesTasksController');

router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.get('/:id/users', tasksController.getTaskUsers); 
router.get('/admin/:userId/:communityId', communitiesTasksController.getTasksForCommunityAdmin);
router.get('/admin-one-task/:userId/:communityId/:taskId', tasksController.getTaskByIdForAdmin);
router.get('/participant/:userId/:communityId', communitiesTasksController.getTasksForCommunityParticipant);
router.get('/participant-one-task/:userId/:communityId/:taskId', tasksController.getTaskByIdForParticipant);

router.post('/', tasksController.createTask);

router.put('/:id', tasksController.updateTask);

module.exports = router;
