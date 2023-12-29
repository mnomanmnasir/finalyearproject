const mongoose = require("mongoose");

const Card = mongoose.model(
    "Card",
    new mongoose.Schema({
        cardId: { type: String, required: true },
        cardType: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        website: String,
        linkedtree: String,
        doc: String,
        action: String,
        url: String,
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Connection"
            }
        ],
        socials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Social"
            }
        ],
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String
    })
);

module.exports = Card;
