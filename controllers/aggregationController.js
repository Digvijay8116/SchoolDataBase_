const Student = require("../models/student");
const Teacher = require("../models/teacher");

// this controller that will gave the student data based on the privided subject
const getStudentbySubject = async (req, res) => {
  try {
    let { subject } = req.body;
    if (!subject) {
      res.status(400).send({
        resp: 'Please provide a subject value: {"math", "bio", "phy", "hindi", "eng", "chem"} indicating the subject for which you want to retrieve student names.',
      });
    } else {
      const result = await Student.aggregate([
        {
          $unwind: {
            path: "$courses",
          },
        },
        {
          $group: {
            _id: "$courses",
            count: {
              $sum: 1,
            },
            fullDetails: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $match: {
            _id: subject,
          },
        },
      ]);
      if (result.length > 0) {
        res.status(200).send({ resp: result });
      } else {
        res
          .status(404)
          .send({ resp: "No students found for the specified subject." });
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

// this controller that will gave the teacher data based on the privided expertIn
const getTeacherNamebyExpertIn = async (req, res) => {
  try {
    const { expertIn } = req.body;
    if (!expertIn) {
      res.status(400).send({
        resp: 'Please provide a value for expertIn: {"math", "bio", "phy", "hindi", "eng", "chem"} indicating the expertise area of the teacher.',
      });
    } else {
      const result = await Teacher.aggregate([
        {
          $group: {
            _id: "$expertIn",
            count: {
              $sum: 1,
            },
            fullDetails: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $match: {
            _id: expertIn,
          },
        },
      ]);

      // Checking if any teachers are found for the specified expertise area
      if (result.length > 0) {
        res.status(200).send({ resp: result });
      } else {
        res.status(404).send({
          resp: "No teachers found with expertise in the specified area.",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

// controller to get assignedStudent to teacher by teacher id
const getStudentByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.body;
    if (!teacherId) {
      res.status(400).send({ resp: "Please provide your teacherId." });
    } else {
      const teacher = await Teacher.find({ teacherId });
      if (!teacher.length > 0) {
        res.status(404).send({ resp: "Not a valid teacher Id." });
      } else {
        const result = await Teacher.aggregate([
          {
            $lookup: {
              from: "students",
              localField: "teacherId",
              foreignField: "assignedTeacherId",
              as: "StudentsData",
            },
          },
          {
            $match: {
              teacherId: teacherId,
            },
          },
          {
            $addFields: {
              Totalstudents: {
                $size: "$StudentsData",
              },
            },
          },
          {
            $project: {
              Totalstudents: 1,
              StudentsData: 1,
            },
          },
        ]);
        res.status(200).send({ resp: result });
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

// controller to get assignedTeacher to student by student id
const getTeacherByStudentId = async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      res.status(400).send({ resp: "Please provide your studentId." });
    } else {
      const student = await Student.find({ studentId });
      if (!student.length > 0) {
        res.status(404).send({ resp: "Not a valid student Id." });
      } else {
        const result = await Student.aggregate([
          {
            $lookup: {
              from: "teachers",
              localField: "assignedTeacherId",
              foreignField: "teacherId",
              as: "TeachersData",
            },
          },
          {
            $match: {
              studentId: studentId,
            },
          },
          {
            $addFields: {
              TotalTeacher: {
                $size: "$TeachersData",
              },
            },
          },
          {
            $project: {
              TeachersData: 1,
              TotalTeacher: 1,
            },
          },
        ]);
        res.status(200).send({ resp: result });
      }
    }
  } catch (error) {
    res.status(500).send({ resp: error.message });
  }
};

module.exports = {
  getStudentbySubject,
  getTeacherNamebyExpertIn,
  getStudentByTeacherId,
  getTeacherByStudentId,
};
