const mongoose = require("mongoose");

const Action = mongoose.model(
    "Action",
    new mongoose.Schema({
        card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true
        // },
        // cardType: { type: String, required: true },
        count: { type: Number, default: 0 },
        status: Boolean,
        action: String,
        actionType: String,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String
    })
);

module.exports = Action;
