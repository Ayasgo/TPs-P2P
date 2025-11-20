const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

router.get('/find', systemController.findFiles);

module.exports = router;
