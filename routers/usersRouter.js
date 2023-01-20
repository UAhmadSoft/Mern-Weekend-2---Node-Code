const express = require('express');
const userController = require('../controllers/userController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// * Get ALl Users
router.get('/', protect, userController.getAllUsers);
// router.delete('/', userController.deleteUsers);

router.post('/login', userController.login);

// * Get Single User
// ! users/123/ali
router.get('/me', protect, (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});
router.patch('/me', protect, upload.single('image'), userController.updateMe);
router.delete('/:id', userController.deleteUser);
router.get('/:id', protect, restrictTo('admin'), userController.getUser);
// router.get('/:id', userController.getUser);

// Create
router.post('/', protect, userController.createUser);

// Update
router.patch('/:id', protect, userController.updateUser);

module.exports = router;
