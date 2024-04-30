const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    phone_number: {
        type: String,
        required: true
    },
    lead_id: {
        type: String,
        required: true
    },
    latest_recording_url: {
        type: String,
        
    },
    campaign_id: {
        type: String
    },
    latest_called_at: {
        type: Date
    },
    lead_outcome: {
        type: String
    },
    processed_at: {
        type: Date
    },
    contact_name: {
        type: String
    },
    created_at: {
        type: Date
    },
    lead_responses: {
        type: Object 
    }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
