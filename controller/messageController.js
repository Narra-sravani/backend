const messageService = require('../services/messageService');

// async function storeMessage(req, res, next) {
//   console.log("res...",req.body);
//   try {
//     const message= req.body;
//     const storedMessage = await messageService.storeMessage(message);
//     res.json({ message: 'Message stored successfully', storedMessage });
//   } catch (error) {
//     console.error('Error storing message:', error);
//     res.status(500).json({ error: 'Failed to store message' });
//   }
// }


const axios = require('axios');

async function storeMessage(req, res, next) {
  console.log("res...",req.body);
  try {
    const message = req.body;
    
    const storedMessage = await messageService.storeMessage(message);

    await autoUpdateForNewLead(message);

    res.json({ message: 'Message stored successfully', storedMessage });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ error: 'Failed to store message' });
  }
}

async function autoUpdateForNewLead(leadData) {
  try {
    const sampleObject = {
      fields: {
        name: leadData.contact_name,
        phone: leadData.phone_number,
        SquadstackCallRecording: leadData.recording_url,
        AdditionalNotes: leadData.question_answers.find(answer => answer.question === "additional_notes")?.answer || "",
        EventTimeline: leadData.question_answers.find(answer => answer.question === "event_timeline")?.answer || "",
        SquadStackStatus: leadData.call_outcome,
        cities: leadData.question_answers.find(answer => answer.question === "other_city")?.answer || ""
      },
      actions: [{ type: "SYSTEM_NOTE" }]
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 44e03335-c176-4929-8bad-43d924f118891710764190404:9a3e0bff-d65e-4f8b-8096-42d86b3b8036'
    };

    const teleCRMResponse = await axios.post('https://api.telecrm.in/enterprise/65a4ef495caf37c09f8c5772/autoupdatelead', sampleObject, { headers });
    
    if (teleCRMResponse.status === 200) {
      console.log('Lead updated successfully in TeleCRM');
    } else {
      throw new Error(`Failed to update lead in TeleCRM: ${teleCRMResponse.statusText}`);
    }
  } catch (error) {
    console.error("Error updating lead in TeleCRM:", error);
    throw new Error(`Error updating lead in TeleCRM: ${error.message}`);
  }
}



async function getData(req,res){
  try{
    const leads=await messageService.getLeads();
    // console.log("ledas",leads);
    res.status(200).json(leads);
  }
  catch(error){
    res.status(404).json({error:"failed"});
  }
}

module.exports = {
  storeMessage,
  getData
};
