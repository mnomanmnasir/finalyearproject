const mongoose = require("mongoose");

const Social = mongoose.model(
    "Social",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        platform: String,
        link: String,
        // created_on: { type: Date, default: Date.now, required: true },
        // created_by: { type: String, required: true },
        // updated_on: Date,
        // updated_by: String
    })
);

module.exports = Social;
