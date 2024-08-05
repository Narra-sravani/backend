const messageService = require('../services/messageService');
const axios = require('axios');

const statusMapping = {
  "INTERESTED": "INTERESTED",
  "NOT INTERESTED": "DO NOT DISTRUB",
  "IN - PROGRESS": "IN - PROGRESS",
  "SKIPPED": "SKIPPED",
  "DO NOT DISTRUB": "DO NOT DISTRUB",
  "CONNECTED BUT NO OPPORTUNITY": "NOT INTERESTED",
  "CLOSING- OTHER CITY": "SKIPPED",
  "NOT DIALABLE": "NOT DIALABLE",
  "NOT CONNECTED": "NOT CONNECTED",
  "RESCHEDULED": "IN - PROGRESS",
  "ABRUPTLY DISCONNECTED AND NOT RECEIVING": "NOT CONNECTED",
  "PHONE NOT ANSWERED": "NOT CONNECTED",
  "LANGUAGE ISSUE": "NOT CONNECTED",
  "CALL RESCHEDULED": "IN - PROGRESS",
  "INVALID NUMBER": "NOT DIALABLE",
  "INVALID NUMBER  OUT OF SERVICE": "NOT DIALABLE",
  "ABRUPTLY TOLD LEAD WOULD CONNECT HIMSELF IF INTERESTED": "DO NOT DISTRUB",
  "ALREADY SPOKEN": "NOT INTERESTED",
  "TECHNICAL ISSUE - CALL NOT CONNECTED": "NOT CONNECTED",
  "DNC CLIENT : DON'T CALL FURTHER": "DO NOT DISTRUB",
  "INCORRECT TARGET LEAD": "NOT CONNECTED",
  "PHONE BUSY": "NOT CONNECTED"
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


async function storeMessage(req, res, next) {
  console.log("Request body:", req.body);
  try {
    const message = req.body;
    
    const storedMessage = await messageService.storeMessage(message);

    // await autoUpdateForNewLead(message);

    res.json({ message: 'Message stored successfully', storedMessage });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ error: 'Failed to store message' });
  }
}

// async function autoUpdateForNewLead(leadData) {
//   try {
//     const normalizedCallOutcome = leadData.call_outcome.toUpperCase().replace(/\s+/g, ' ').trim();
   

//     const mappedStatus = Object.keys(statusMapping).find(key => key.toUpperCase() === normalizedCallOutcome);

//     if (!mappedStatus) {
//       console.log('Status not in the mapped list, skipping update.');
//       return;
//     }
//     const eventTimeline = leadData.question_answers.find(answer => answer.question === "event_timeline")?.answer || "";
//     let urgent = "Low";
//     const lowerCaseTimeline = eventTimeline.toLowerCase();
//     if(normalizedCallOutcome === "INTERESTED"){
//       if (lowerCaseTimeline.includes('tomorrow') || lowerCaseTimeline.includes('this week') || lowerCaseTimeline.includes('next week')) {
//         urgent = "High";
//       } else if (lowerCaseTimeline.includes('this month') || lowerCaseTimeline.includes('next month')) {
//         urgent = "Medium";
//       } else if(lowerCaseTimeline.includes('not planned yet')){
//         urgent= "Low";
//       }
//     }
  

//     console.log(`Urgency for lead ${leadData.lead_id}: ${urgent}`);

//     leadData.urgent = urgent;



//     const sampleObject = {
//       fields: {
//         name: leadData.contact_name,
//         phone: leadData.phone_number,
//         SquadstackCallRecording: leadData.recording_url,
//         AdditionalNotes: leadData.question_answers.find(answer => answer.question === "additional_notes")?.answer || "",
//         EventTimeline: leadData.question_answers.find(answer => answer.question === "event_timeline")?.answer || "",
//         SquadStackStatus: statusMapping[mappedStatus], // Use the mapped status from statusMapping
//         cities: leadData.question_answers.find(answer => answer.question === "other_city")?.answer || "",
//         Urgent: urgent
//       },
//       actions: [{ type: "SYSTEM_NOTE" }]
//     };

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 44e03335-c176-4929-8bad-43d924f118891710764190404:9a3e0bff-d65e-4f8b-8096-42d86b3b8036'
//     };

//     const teleCRMResponse = await axios.post('https://api.telecrm.in/enterprise/65a4ef495caf37c09f8c5772/autoupdatelead', sampleObject, { headers });

//     if (teleCRMResponse.status === 200) {
//       console.log('Lead updated successfully in TeleCRM');
//     } else {
//       throw new Error(`Failed to update lead in TeleCRM: ${teleCRMResponse.statusText}`);
//     }

   
//   } catch (error) {
//     console.error("Error updating lead in TeleCRM:", error);
//     throw new Error(`Error updating lead in TeleCRM: ${error.message}`);
//   }
// }

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

// const messageService = require('../services/messageService');
// const axios = require('axios');

// Store incoming lead data from TeleCRM
// async function storeMessage(req, res, next) {
//   console.log("Request body:", req.body);
//   try {
//     const message = req.body;
//     const storedMessage = await messageService.storeMessage(message);
//     res.json({ message: 'Message stored successfully', storedMessage });
//   } catch (error) {
//     console.error('Error storing message:', error);
//     res.status(500).json({ error: 'Failed to store message' });
//   }
// }

// Process leads and send to SquadStack
// async function processLeads() {
//   try {
//     const today = new Date().getDay();
//     if (today === 0) {
//       console.log('No leads processing on Sundays');
//       return;
//     }

//     const leads = await messageService.getNewLeads();
//     if (leads.length === 0) {
//       console.log('No new leads to process');
//       return;
//     }

//     const leadsToSend = leads.slice(0, 300);
//     const response = await axios.post('https://api.squadstack.com/leads', { leads: leadsToSend });

//     const updatedLeads = response.data.updatedLeads;
//     for (const updatedLead of updatedLeads) {
//       await messageService.updateLeadStatus(updatedLead.id, 'processed', updatedLead);
//       await autoUpdateForTeleCRM(updatedLead);
//     }

//     const remainingLeads = leads.slice(300);
//     for (const lead of remainingLeads) {
//       await messageService.updateLeadStatus(lead._id, 'rescheduled');
//     }
//   } catch (error) {
//     console.error('Error processing leads:', error);
//   }
// }

// Update lead data in TeleCRM
// async function autoUpdateForTeleCRM(leadData) {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 44e03335-c176-4929-8bad-43d924f118891710764190404:9a3e0bff-d65e-4f8b-8096-42d86b3b8036'
//     };

//     const teleCRMResponse = await axios.put(`https://api.telecrm.in/enterprise/65a4ef495caf37c09f8c5772/autoupdatelead/${leadData.id}`, { fields: leadData.updatedFields }, { headers });

//     if (teleCRMResponse.status === 200) {
//       console.log('Lead updated successfully in TeleCRM');
//     } else {x
//       throw new Error(`Failed to update lead in TeleCRM: ${teleCRMResponse.statusText}`);
//     }
//   } catch (error) {
//     console.error("Error updating lead in TeleCRM:", error);
//     throw new Error(`Error updating lead in TeleCRM: ${error.message}`);
//   }
// }

// Get stored lead data
// async function getData(req, res) {
//   try {
//     const leads = await messageService.getLeads();
//     res.status(200).json(leads);
//   } catch (error) {
//     res.status(404).json({ error: "Failed to fetch data" });
//   }
// }

// module.exports = {
//   storeMessage,
//   getData,
//   processLeads
// };



