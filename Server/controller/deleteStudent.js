const Student = require("../models/studentModel");

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      res.status(404).json({ message: "Student Not Found" });
    }
    res.status(200).json({ message: "Student Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = deleteStudent;
