const mongoose = require("mongoose");

const Shipment = mongoose.model(
    "Shipment",
    new mongoose.Schema({
        name: String,
        date: Date,
        arrivalDate: Date,
        status: String,
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        carrier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Carrier"
        },

        created_on: { type: Date, default: Date.now, required: true },
        created_by: String,
        updated_on: Date,
        updated_by: String,

    })
);

module.exports = Shipment;
