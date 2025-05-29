const Student = require("../models/studentModel");

const editStudent = async (req, res) => {
  //   const { name, age, fatherName, motherName, studentClass, section } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ message: "Student Not found" });
    }
    res.status(200).json({
      message: "Student Updated Sucessfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = editStudent;
