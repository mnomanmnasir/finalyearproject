const mongoose = require("mongoose");

const Sale = mongoose.model(
    "Sale",
    new mongoose.Schema({
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

module.exports = Sale;
