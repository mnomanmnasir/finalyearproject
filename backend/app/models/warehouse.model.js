const mongoose = require("mongoose");

const Warehouse = mongoose.model(
    "Warehouse",
    new mongoose.Schema({
        name: { type: String, required: true },
        address: { type: String, required: true },
        capacity: { type: String, default: 0 },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        temperatureControlled: { type: Boolean, default: false },
        status: { type: String, default: "active" },
        created_on: { type: Date, default: Date.now, required: true },
        created_by: String,
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Warehouse;
