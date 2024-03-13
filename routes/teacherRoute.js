const express = require("express");
const teacher_route = express();

const teacher_controller = require("../controllers/teacherController");
teacher_route.put("/register", teacher_controller.teacherRegister);

module.exports = teacher_route;
