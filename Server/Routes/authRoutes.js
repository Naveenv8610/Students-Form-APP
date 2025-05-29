const express = require("express");
const router = express.Router();
const signUpUser = require("../controller/SignupController");
const LoginUser = require("../controller/loginCOntroller");
const Student = require("../controller/studentFormController");
const getStudents = require("../controller/getStudents");
const editStudent = require("../controller/editStudent");
const deleteStudent = require("../controller/deleteStudent");

router.post("/signup", signUpUser);
router.post("/login", LoginUser);
router.post("/student", Student);
router.get("/getstudents", getStudents);
router.put("/editstudent/:id", editStudent);
router.delete("/deletestudent/:id", deleteStudent);

module.exports = router;
