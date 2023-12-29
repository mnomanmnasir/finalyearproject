const mongoose = require("mongoose");

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: String, // { open,  inprogress, closed }
        subject: String,
        description: String,
        handled_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String
    })
);

module.exports = Ticket;