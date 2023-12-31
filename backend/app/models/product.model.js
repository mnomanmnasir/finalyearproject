const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        sku: { type: String },
        name: { type: String, required: true },
        description: String,
        unitPrice: { type: Number, required: true },
        weight: Number,
        height: String,
        width: String,
        depth: String,
        HazardousMaterial: Boolean,
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Product;
