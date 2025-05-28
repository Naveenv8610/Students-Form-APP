const express = require("express");
const router = express.Router();
const signUpUser = require("../controller/SignupController");
const LoginUser = require("../controller/loginCOntroller");
const Student = require("../controller/studentFormController");
const getStudents = require("../controller/getStudents");

router.post("/signup", signUpUser);
router.post("/login", LoginUser);
router.post("/student", Student);
router.get("/getstudents", getStudents);

module.exports = router;
