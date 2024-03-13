const Student = require("../models/student");

const studentRegister = async (req, res) => {
  try {
    const { name, age, phoneNumber, assignedTeacherId, studentId, courses } =
      req.body;
    if (!name) {
      res.status(400).send({ resp: "Name is missing." });
    } else if (!age) {
      res.status(400).send({ resp: "Age is not given." });
    } else if (!phoneNumber) {
      res.status(400).send({ resp: "Phone number is not given." });
    } else if (!assignedTeacherId) {
      res.status(400).send({ resp: "Assigned teacher ID is not provided." });
    } else if (!studentId) {
      res.status(400).send({ resp: "Student ID is not provided." });
    } else if (!courses) {
      res.status(400).send({ resp: "Courses are not provided." });
    } else {
      let student = await Student.findOne({ studentId });
      if (student) {
        res.status(409).send({ resp: "Student ID already exists." });
      } else {
        let newStudent = new Student(req.body);
        newStudent = await newStudent.save();
        if (newStudent) {
          res.status(201).send({ resp: "Student registration successful." });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

module.exports = { studentRegister };
