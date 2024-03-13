const StudentRight = require("../models/studentRights");

const studentRight = async (req, res) => {
  try {
    const { studentId, rights } = req.body;
    if (!studentId) {
      res.status(400).send({ resp: "Please provide studentId." });
    } else if (!rights) {
      res.status(400).send({ resp: "Please provide rights." });
    } else {
      let studentRights = new StudentRight(req.body);
      studentRights = await studentRights.save();
      if (studentRights) {
        res.status(201).send({ resp: studentRights });
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

const studentByRight = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      res.status(400).send({ resp: "Please provide the rightId (_id)." });
    } else {
      const studentRight = await StudentRight.find({ _id }).populate(
        "studentId"
      );
      res.status(200).send({ resp: studentRight });
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

module.exports = { studentRight, studentByRight };
