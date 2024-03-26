const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

router.post('/post-data', messageController.storeMessage);

module.exports = router;
