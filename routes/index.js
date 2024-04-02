const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

router.post('/post-data', messageController.storeMessage);
router.get('/get-data',messageController.getData)

module.exports = router;
