const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "member"], //role based
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userShema);
