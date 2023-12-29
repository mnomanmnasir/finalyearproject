const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        name: String,
        contactNumber: Number,
        email: String,

        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Customer;
