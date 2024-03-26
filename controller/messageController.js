const messageService = require('../services/messageService');

async function storeMessage(req, res, next) {
  try {
    const { message } = req.body;
    const storedMessage = await messageService.storeMessage(message);
    res.json({ message: 'Message stored successfully', storedMessage });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ error: 'Failed to store message' });
  }
}

module.exports = {
  storeMessage
};
