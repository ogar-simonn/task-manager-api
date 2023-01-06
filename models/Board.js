const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    boardTitle: {
      type: String,
      required: [true, "must provide board title"],
      trim: true,
      maxLength: [20, "name cannot be more than 20 character"],
    },
    tasks: {
      type: Array,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", BoardSchema);
