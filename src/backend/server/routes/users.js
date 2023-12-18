// /server/routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/:id/tasks', usersController.getUserTasks); 

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);
 
module.exports = router;
