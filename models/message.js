
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    call_duration: {
        type: Number,
        required: true
    },
    call_outcome: {
        type: String,
        required: true
    },
    call_outcome_id: {
        type: Number,
        required: true
    },
    caller_id: {
        type: String,
        required: true
    },
    recording_url: {
        type: String,
        required: true
    },
    question_answers: {
        type: Array,
        default: []
    },
    call_reference_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    voice_player_mission_id: {
        type: Number,
        required: true
    },
    called_at: {
        type: Date,
        required: true
    },
    vm_name: {
        type: String,
        required: true
    },
    call_end_time: {
        type: Date,
        required: true
    },
    billable_call_duration: {
        type: Number,
        default: null
    },
    vm_reference_id: {
        type: String,
        required: true
    },
    call_attempt_number: {
        type: String,
        required: true
    },
    is_final_call_attempt: {
        type: Boolean,
        required: true
    },
    agent_reference_id: {
        type: String,
        required: true
    },
    is_connected_call: {
        type: Boolean,
        required: true
    },
    state_code: {
        type: String,
        default: null
    },
    lead_source: {
        type: Array,
        default: []
    },
    sr_idata_stage: {
        type: Number,
        required: true
    },
    lead_source_url: {
        type: String,
        required: true
    },
    "{custom_field_1}": {
        type: String,
        required: true
    },
    "{custom_field_2}": {
        type: String,
        required: true
    },
    sr_idata_is_valid: {
        type: Boolean,
        required: true
    },
    sr_idata_stage_txt: {
        type: String,
        required: true
    },
    lead_create_datetime: {
        type: Date,
        required: true
    },
    sr_idata_is_duplicate: {
        type: Boolean,
        required: true
    },
    sr_idata_edge_conditions_list: {
        type: Array,
        default: [{}]
    },
    sr_idata_called_ids_for_vpm_114707428: {
        type: Array,
        default: []
    },
    sr_idata_healthy_caller_ids_list_for_vpm_114707428: {
        type: Array,
        default: []
    },
    lead_created_at: {
        type: Date,
        required: true
    },
    ccc_num_calls: {
        type: Number,
        required: true
    },
    campaign_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    lead_id: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    contact_name: {
        type: String,
        required: true
    },
    lead_responses: {
        type: Object,
        default: {}
    }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;

