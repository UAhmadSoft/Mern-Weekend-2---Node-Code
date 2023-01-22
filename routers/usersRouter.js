const express = require('express');
const userController = require('../controllers/userController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    console.log('file', file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let ext = file.mimetype.split('/');
    console.log('ext', ext);
    ext = ext[1];
    console.log('ext', ext);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
});

const upload = multer({ storage });

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
router.post('/student', userController.createStudent);
router.post('/teacher', userController.createTeacher);

// Update
router.patch('/:id', protect, userController.updateUser);

module.exports = router;
