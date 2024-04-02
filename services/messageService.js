const Message = require('../models/message');

async function storeMessage(message) {
  console.log("message",message)
  try {
    const newMessage = new Message({...message });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
}

async function getLeads(){
 try{
  const data=await Message.find();
  console.log("data",data);
  return data;

 }catch(error){
 throw error;
 }
}

module.exports = {
  storeMessage,
  getLeads
};
