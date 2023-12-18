// /server/routes/communities.js

const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');

router.get('/', communitiesController.getAllCommunities);
router.get('/:id', communitiesController.getCommunityById);

router.post('/', communitiesController.createCommunity);

router.put('/:id', communitiesController.updateCommunity);

module.exports = router;
