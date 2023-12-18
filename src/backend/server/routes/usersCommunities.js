// /server/routes/usersCommunities.js

const express = require('express');
const router = express.Router();
const usersCommunitiesController = require('../controllers/usersCommunitiesController');

router.get('/', usersCommunitiesController.getAllUsersCommunities);
router.get('/:id', usersCommunitiesController.getUserCommunities);

router.put('/:id', usersCommunitiesController.updateUserCommunity);

module.exports = router;
