const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    status: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
