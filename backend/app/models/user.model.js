const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card"
    },
    status: String,
    last_login: Date,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    created_on: { type: Date, default: Date.now, required: true },
    created_by: { type: String, required: true },
    updated_on: Date,
    updated_by: String,
    verification: { type: { code: Number, verified: Boolean, time: Date }, required: false },
    verified: { type: Boolean, required: false },
    otp: { type: { code: Number, time: Date }, required: false }
  })
);

module.exports = User;
