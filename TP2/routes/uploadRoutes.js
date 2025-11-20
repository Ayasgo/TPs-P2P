const express = require('express');
const multer = require('multer');

const uploadController = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadController.uploadImage);
router.get('/show/:login', uploadController.showImage);

module.exports = router;
