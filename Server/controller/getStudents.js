const Student = require("../models/studentModel");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};

module.exports = getStudents;
