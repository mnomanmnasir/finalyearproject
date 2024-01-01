const mongoose = require("mongoose");

const Carrier = mongoose.model(
    "Carrier",
    new mongoose.Schema({
        name: String,
        contactPerson: String,
        contactNumber: String,

        created_on: { type: Date, default: Date.now, required: true },
        created_by: String,
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Carrier;
