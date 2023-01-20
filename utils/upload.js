const multer = require('multer');
const path = require('path');
const cloudinary = require('./cloudinary');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ear-training',
    upload_preset: process.env.CLOUDINARY_PRESET,
    format: 'mp3',
    resource_type: 'video',
    allowedFormats: ['mp3'],
    // format: async (req, file) => 'png', // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
  },
});

// Multer config
module.exports = multer({
  storage: storage,
  // storage: multer.diskStorage({}),
  // fileFilter: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
  //   console.log(`ext`, ext);
  //   if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
  //     cb(new Error('File type is not supported'), false);
  //     return;
  //   }
  //   cb(null, true);
  // },
});
