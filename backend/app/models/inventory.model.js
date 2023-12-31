const mongoose = require("mongoose");

const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema({
        name: { type: String, default: "" },
        quantityOnHand: { type: Number, default: 0 },
        quantityReserved: { type: Number, default: 0 },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse"
        },
        created_on: { type: Date, default: Date.now, required: true },
        created_by: String,
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Inventory;
