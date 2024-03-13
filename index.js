const express = require("express");
const app = express();
require("./config/config");

const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//use this line to read data from the body
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SchoolDataBase",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//routes
const student_route = require("./routes/studentRoute");
const teacher_route = require("./routes/teacherRoute");
const aggregation_route = require("./routes/aggregationRoute");
const populate_route = require("./routes/populateRoute");

app.use("/student", student_route);
app.use("/teacher", teacher_route);
app.use("/aggregation", aggregation_route);
app.use("/populate", populate_route);

//populate/studentByRight
/**
 * @swagger
 * /populate/studentByRight:
 *   post:
 *     summary: Get students by right
 *     description: Retrieve students associated with a specific right identified by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved students associated with the specified right.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request. The required field '_id' is missing.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//populate/studentRights
/**
 * @swagger
 * /populate/studentRights:
 *   post:
 *     summary: Assign rights to a student
 *     description: Assign rights to a student identified by their student ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *               rights:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student rights assigned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: object
 *       400:
 *         description: Bad request. Either student ID or rights field is missing.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//agreegation/getTeacherByStudentId
/**
 * @swagger
 * /aggregation/getTeacherByStudentId:
 *   put:
 *     summary: Get teacher assigned to a student
 *     description: Retrieve the teacher assigned to a student by their student ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the teacher assigned to the specified student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       TeachersData:
 *                         type: array
 *                         items:
 *                           type: object
 *                       TotalTeacher:
 *                         type: integer
 *       400:
 *         description: Bad request. The required field 'studentId' is missing or invalid.
 *       404:
 *         description: No teacher found for the specified student ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//agreegation/getStudentByTeacherId
/**
 * @swagger
 * /aggregation/getStudentByTeacherId:
 *   put:
 *     summary: Get students assigned to a teacher
 *     description: Retrieve students assigned to a teacher by their teacher ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved students assigned to the specified teacher.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Totalstudents:
 *                         type: integer
 *                       StudentsData:
 *                         type: array
 *                         items:
 *                           type: object
 *       400:
 *         description: Bad request. The required field 'teacherId' is missing or invalid.
 *       404:
 *         description: No students found for the specified teacher ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//agreegation/getTeacherNamebyExpertIn
/**
 * @swagger
 * /aggregation/getTeacherNamebyExpertIn:
 *   put:
 *     summary: Get teachers by expertise
 *     description: Retrieve teachers based on their expertise in a subject.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expertIn:
 *                 type: string
 *                 enum: ["math", "bio", "phy", "hindi", "eng", "chem"]
 *     responses:
 *       200:
 *         description: Successfully retrieved teachers for the specified expertise.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *                       fullDetails:
 *                         type: array
 *                         items:
 *                           type: object
 *       400:
 *         description: Bad request. The required field 'expertIn' is missing or invalid.
 *       404:
 *         description: No teachers found for the specified expertise.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//agreegation/getStudentBySubject
/**
 * @swagger
 * /aggregation/getStudentBySubject:
 *   put:
 *     summary: Get students by subject
 *     description: Retrieve students enrolled in a specific subject.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 enum: ["math", "bio", "phy", "hindi", "eng", "chem"]
 *     responses:
 *       200:
 *         description: Successfully retrieved students for the specified subject.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resp:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *                       fullDetail:
 *                         type: array
 *                         items:
 *                           type: object
 *       400:
 *         description: Bad request. The required field 'subject' is missing or invalid.
 *       404:
 *         description: No students found for the specified subject.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

//student/register
/**
 * @swagger
 * /student/register:
 *   put:
 *     summary: Register a new student
 *     description: Register a new student with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: integer
 *               assignedTeacherId:
 *                 type: integer
 *               studentId:
 *                 type: integer
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Student registered successfully
 *       400:
 *         description: Bad request. One or more required fields are missing.
 *       409:
 *         description: Conflict. The provided studentId already exists.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

/**
 * @swagger
 * /teacher/register:
 *   put:
 *     summary: Register a new teacher
 *     description: Register a new teacher with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: integer
 *               teacherId:
 *                 type: integer
 *               expertIn:
 *                 type: string
 *                 enum: ["math", "bio", "phy", "hindi", "eng", "chem"]
 *     responses:
 *       200:
 *         description: Teacher registered successfully
 *       400:
 *         description: Bad request. One or more required fields are missing.
 *       409:
 *         description: Conflict. The provided teacherId already exists.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: This API is used to check if the GET method is working or not
 *    description: This API is used to check if the GET method is working or not
 *    responses:
 *      200:
 *        description: Successful operation. Returns the response.
 */


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`I am live at port number ${PORT}`);
});
