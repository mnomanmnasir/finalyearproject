const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        sku: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        weight: { type: Number, required: true },
        height: String,
        width: String,
        depth: String,
        HazardousMaterial: Boolean,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Product;
