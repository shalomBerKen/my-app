// /server/routes/usersCommunities.js

const express = require('express');
const router = express.Router();
const usersCommunitiesController = require('../controllers/usersCommunitiesController');

router.get('/', usersCommunitiesController.getAllUsersCommunities);
router.get('/:id', usersCommunitiesController.getUserCommunities);
router.get('/:id/manager-communities', usersCommunitiesController.getUserManagerCommunities);
router.get('/:id/participant-communities', usersCommunitiesController.getUserParticipantCommunities);

router.put('/:id', usersCommunitiesController.updateUserCommunity);

module.exports = router;
