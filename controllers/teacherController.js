const Teacher = require("../models/teacher");

const teacherRegister = async (req, res) => {
  try {
    const { name, age, phoneNumber, teacherId, expertIn } = req.body;
    if (!name) {
      res.status(400).send({ resp: "Name is not provided." });
    } else if (!age) {
      res.status(400).send({ resp: "Age is not provided." });
    } else if (!phoneNumber) {
      res.status(400).send({ resp: "Phone number is not provided." });
    } else if (!teacherId) {
      res.status(400).send({ resp: "Teacher ID is not provided." });
    } else if (!expertIn) {
      res.status(400).send({
        resp: 'Please specify expertise in {"math", "bio", "phy", "hindi", "eng", "chem"}.',
      });
    } else {
      let teacher = await Teacher.findOne({ teacherId });
      if (teacher) {
        res.status(409).send({ resp: "Teacher ID already exists." });
      } else {
        let newTeacher = new Teacher(req.body);
        newTeacher = await newTeacher.save();
        if (newTeacher) {
          res.status(201).send({ resp: "Teacher registration successful." });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

module.exports = { teacherRegister };
