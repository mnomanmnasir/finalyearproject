const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        name: String,
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        orderDate: Date,
        status: Boolean,

        created_on: { type: Date, default: Date.now, required: true },
        created_by: { type: String, required: true },
        updated_on: Date,
        updated_by: String,
    })
);

module.exports = Order;
