const Message = require('../models/message');

// Store lead data in MongoDB
async function storeMessage(message) {
  try {
    const newMessage = new Message({ ...message });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
}

// Get all stored leads
async function getLeads() {
  try {
    const data = await Message.find();
    console.log("Fetched leads:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

// Get new leads to process
async function getNewLeads() {
  try {
    const data = await Message.find({ status: 'new' }).sort({ createdAt: 1 });
    return data;
  } catch (error) {
    throw error;
  }
}

// Update lead status
async function updateLeadStatus(leadId, status, updatedFields = {}) {
  try {
    await Message.updateOne({ _id: leadId }, { status, updatedFields });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  storeMessage,
  getLeads,
  getNewLeads,
  updateLeadStatus
};
