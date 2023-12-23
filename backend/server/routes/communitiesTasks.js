// /server/routes/communitiesTasks.js

const express = require('express');
const router = express.Router();
const communitiesTasksController = require('../controllers/communitiesTasksController');

router.get('/', communitiesTasksController.getAllCommunitiesTasks);

router.post('/', communitiesTasksController.addCommunityTask);

module.exports = router;
