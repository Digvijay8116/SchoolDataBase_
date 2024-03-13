const express = require("express");
const aggregation_route = express();

const aggregationController = require("../controllers/aggregationController");

//route to get student by their subject name
aggregation_route.put(
  "/getStudentBySubject",
  aggregationController.getStudentbySubject
);

// route to get teachers based on their expert in 
aggregation_route.put(
  "/getTeacherNamebyExpertIn",
  aggregationController.getTeacherNamebyExpertIn
);

// route to get assignedStudent to teacher by teacher id
aggregation_route.put(
  "/getStudentByTeacherId",
  aggregationController.getStudentByTeacherId
);

// route to get assignedTeacher to student by student id
aggregation_route.put(
  "/getTeacherByStudentId",
  aggregationController.getTeacherByStudentId
);

module.exports = aggregation_route;
