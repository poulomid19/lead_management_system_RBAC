const mongoose = require("mongoose")
const leadSchema = new mongoose.Schema({
    leadname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    source:{
        type: String,
        required: true,
        enum: ['website', 'referral', 'cold_call', 'social', 'other'],
        default: "website"
    },
    message:{
        type: String,
        required: true
    },
    leadstatus:{
        type: String,
        required: true,
        enum: ['new', 'contacted', 'won', 'lost'],
        default: "new"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{ timestamps: true }
)
module.exports = mongoose.model("Leads", leadSchema)