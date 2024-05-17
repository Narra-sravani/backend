
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    call_duration: {
        type: String,
        default: null
    },
    call_outcome: {
        type: String,
        default: null
    },
    lead_outcome:{
        type: String,
        default: null
    },
    
    call_outcome_id: {
        type: String,
        default: null
    },
    caller_id: {
        type: String,
        default: null
    },
    recording_url: {
        type: String,
        default: null
    },
    question_answers: {
        type: Array,
        default: []
    },
    call_reference_id: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    voice_player_mission_id: {
        type: String,
        default: null
    },
    called_at: {
        type: String,
        default: null
    },
    vm_name: {
        type: String,
        default: null
    },
    call_end_time: {
        type: String,
        default: null
    },
    billable_call_duration: {
        type: String,
        default: null
    },
    vm_reference_id: {
        type: String,
        default: null
    },
    call_attempt_number: {
        type: String,
        default: null
    },
    is_final_call_attempt: {
        type: Boolean,
        default: null
    },
    agent_reference_id: {
        type: String,
        default: null
    },
    is_connected_call: {
        type: Boolean,
        default: null
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
        type: String,
        default: null
    },
    lead_source_url: {
        type: String,
        default: null
    },
    "{custom_field_1}": {
        type: String,
        default: null
    },
    "{custom_field_2}": {
        type: String,
        default: null
    },
    sr_idata_is_valid: {
        type: Boolean,
        default: null
    },
    sr_idata_stage_txt: {
        type: String,
        default: null
    },
    lead_create_datetime: {
        type: String,
        default: null
    },
    sr_idata_is_duplicate: {
        type: Boolean,
        default: null
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
        type: String,
        default: null
    },
    ccc_num_calls: {
        type: String,
        default: null
    },
    campaign_id: {
        type: String,
        default: null
    },
    created_at: {
        type: String,
        default: null
    },
    lead_id: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        default: null
    },
    contact_name: {
        type: String,
        default: null
    },
    lead_responses: {
        type: Object,
        default: {}
    }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;

