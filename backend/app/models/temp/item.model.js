const mongoose = require("mongoose");

const Item = mongoose.model(
    "Item",
    new mongoose.Schema({
        // email: { type: String, required: true },
        name: String,
        company: String,
        category: String,
        type: String,
        price: String,
        salePrice: String,
        count: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Item;
