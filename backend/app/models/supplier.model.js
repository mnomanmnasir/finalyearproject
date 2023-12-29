const mongoose = require("mongoose");

const Supplier = mongoose.model(
    "Supplier",
    new mongoose.Schema({
        name: String,
        contactPerson: String,
        contact: String,
        email: String,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Supplier;