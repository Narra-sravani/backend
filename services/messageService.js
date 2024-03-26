const Message = require('../models/message');

async function storeMessage(message) {
  try {
    const newMessage = new Message({ message });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  storeMessage
};
