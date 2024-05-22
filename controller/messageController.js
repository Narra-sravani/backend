const messageService = require('../services/messageService');
const axios = require('axios');

const statusMapping = {
  "INTERESTED": "Interested",
  "NOT INTERESTED": "Not Interested",
  "IN PROGRESS": "In Progress",
  "SKIPPED": "Skipped",
  "CONNECTED BUT NO OPPORTUNITY": "Not interested",
  "CLOSING OTHER CITY-ACCEPTING": "",
  "NOT DIALABLE": "Not Dialable",
  "NOT CONNECTED": "Not Connected",
  "RESCHEDULED": "In progress",
  "ABRUPTLY DISCONNECTED": "Not connected",
  "NOT RECEIVING": "Not connected",
  "PHONE NOT ANSWERED": "Not connected",
  "LANGUAGE ISSUE": "Not Connected",
  "CALL RESCHEDULED": "In progress",
  "INVALID NUMBER": "Not Dialable",
  "OUT OF SERVICE": "Not Dialable",
  "ABRUPTLY TOLD LEAD WOULD CONNECT HIMSELF IF INTERESTED": "Not interested",
  "ALREADY SPOKEN": "Not interested",
  "TECHNICAL ISSUE - CALL NOT CONNECTED": "Not connected",
  "DNC CLIENT: DON'T CALL FURTHER": "Do not disturb",
  "INCORRECT TARGET LEAD": "Not Connected",
  "PHONE BUSY": "Not Connected"
};

async function storeMessage(req, res, next) {
  console.log("Request body:", req.body);
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
    const normalizedCallOutcome = leadData.call_outcome.toUpperCase().replace(/\s+/g, ' ').trim();
    
    const mappedStatus = statusMapping[normalizedCallOutcome];

    if (!mappedStatus) {
      console.log('Status not in the mapped list, skipping update.');
      return;
    }

    const sampleObject = {
      fields: {
        name: leadData.contact_name,
        phone: leadData.phone_number,
        SquadstackCallRecording: leadData.recording_url,
        AdditionalNotes: leadData.question_answers.find(answer => answer.question === "additional_notes")?.answer || "",
        EventTimeline: leadData.question_answers.find(answer => answer.question === "event_timeline")?.answer || "",
        SquadStackStatus: mappedStatus,
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

async function getData(req, res) {
  try {
    const leads = await messageService.getLeads();
    res.status(200).json(leads);
  } catch (error) {
    res.status(404).json({ error: "failed" });
  }
}

module.exports = {
  storeMessage,
  getData
};
