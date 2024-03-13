const mongoose = require("mongoose");

const studentRightsSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
    rights: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentRights", studentRightsSchema);
