const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// * Get ALl Users
router.get('/', userController.getAllUsers);

// * Get Single User
// ! users/123/ali
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser);

// Create
router.post('/', userController.createUser);

// Update
router.patch('/:id', userController.updateUser);

module.exports = router;
