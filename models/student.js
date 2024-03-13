const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    assignedTeacherId: {
      type: Number,
      require: true,
    },
    studentId: {
      type: Number,
      require: true,
    },
    courses: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("students", studentSchema);
