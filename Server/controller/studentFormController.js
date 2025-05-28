const Student = require("../models/studentModel");

const addStudent = async (req, res) => {
  const { name, age, fatherName, motherName, studentClass, section } = req.body;
  try {
    const newStudent = new Student({
      name,
      age,
      fatherName,
      motherName,
      studentClass,
      section,
    });
    await newStudent.save();

    res.status(200).json({
      message: "Student added Sucessfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error " });
  }
};

module.exports = addStudent;
