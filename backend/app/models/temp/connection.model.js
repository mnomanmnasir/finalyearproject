const mongoose = require("mongoose");

const Connection = mongoose.model(
    "Connection",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String,
        pass: String,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String
    })
);

module.exports = Connection;
