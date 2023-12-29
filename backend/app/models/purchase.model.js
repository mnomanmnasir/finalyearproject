const mongoose = require("mongoose");

const Purchase = mongoose.model(
    "Purchase",
    new mongoose.Schema({
        // email: { type: String, required: true },
        company: String,
        contact: String,
        email: String,
        pay: String,
        advance: String,
        status: Boolean,
        referance: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            }
        ],
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Purchase;
