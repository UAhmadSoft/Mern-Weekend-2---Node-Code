const express = require('express');
const userController = require('../controllers/userController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');
const router = express.Router();

// * Get ALl Users
router.get('/', protect, userController.getAllUsers);

router.post('/login', userController.login);

// * Get Single User
// ! users/123/ali
router.delete('/:id', userController.deleteUser);
// router.get('/:id', protect, restrictTo('admin'), userController.getUser);
router.get('/:id', userController.getUser);

// Create
router.post('/', userController.createUser);

// Update
router.patch('/:id', userController.updateUser);

module.exports = router;
