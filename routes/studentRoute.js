const express = require("express");
const student_route = express();

const student_controller = require("../controllers/studentController");
student_route.put("/register", student_controller.studentRegister);

module.exports = student_route;
