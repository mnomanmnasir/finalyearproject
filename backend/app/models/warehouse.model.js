const mongoose = require("mongoose");

const Warehouse = mongoose.model(
    "Warehouse",
    new mongoose.Schema({
        name: { type: String, required: true },
        address: { type: String, required: true },
        capacity: String,
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        temperatureControlled : Boolean,
        status: Boolean,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Warehouse;
