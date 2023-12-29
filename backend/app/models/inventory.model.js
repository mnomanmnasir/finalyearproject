const mongoose = require("mongoose");

const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema({
        name: String,
        quantityOnHand: Number,
        quantityReserved: Number,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse"
        },
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Inventory;
