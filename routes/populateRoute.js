const express = require("express");
const populate_route = express();

const studentRightsController = require("../controllers/studentRightsController");

populate_route.post("/studentRights", studentRightsController.studentRight);
populate_route.post("/studentByRight", studentRightsController.studentByRight);
module.exports = populate_route;