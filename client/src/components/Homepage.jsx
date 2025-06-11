import React, { useState } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "./sidebar";
import StudentForm from "./StudentForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Homepage = () => {
  const navigate = useNavigate();
  const [selctedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleEdit = async () => {
    setEditMode(true);
    setStudentToEdit(selctedStudent);
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are u sure u want to delete");
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/deletestudent/${selctedStudent._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Student Deleted Sucessfully");
        setSelectedStudent(null);
      } else if (response.status === 404) {
        alert("Student not found");
      } else {
        alert("Failed to delete student");
      }
    } catch (error) {
      alert("Error in deleting");
    }
  };
  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      <Box sx={{ width: "400px", padding: 2, borderRight: "1px solid #ccc" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {" "}
          Students List{" "}
        </Typography>
        <SideBar onselectstudent={setSelectedStudent} />
      </Box>

      <Box display="flex" flexDirection="column">
        <Box sx={{ padding: 3 }}>
          <Paper elevation={4} sx={{ padding: 6 }}>
            <StudentForm
              editMode={editMode}
              student={studentToEdit}
              onDoneEditing={() => {
                setEditMode(false);
                setStudentToEdit(null);
              }}
            />
          </Paper>
        </Box>

        <Box sx={{ padding: 3, flexGrow: 1, height: "100vh" }}>
          {selctedStudent ? (
            <Paper elevation={4} sx={{ padding: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
              >
                {" "}
                Student Details{" "}
              </Typography>
              <Grid container spacing={40}>
                <Grid item xs={8} sx={{ padding: 2 }}>
                  <Typography>
                    {" "}
                    <strong>Name:</strong> {selctedStudent.name}
                  </Typography>
                  <Typography>
                    <strong>Age:</strong>
                    {selctedStudent.age}
                  </Typography>
                  <Typography>
                    <strong>Father Name :</strong>
                    {selctedStudent.fatherName}
                  </Typography>
                  <Typography>
                    <strong>Mother Name:</strong>
                    {selctedStudent.motherName}
                  </Typography>
                  <Typography>
                    <strong>Class :</strong>
                    {selctedStudent.studentClass}
                  </Typography>
                  <Typography>
                    <strong>Section:</strong>
                    {selctedStudent.section}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    component={"img"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJqngNJ42uWE0Zy6S6rHTuW8pn6p-cuogyQ&s"
                    alt="student"
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                <Button
                  endIcon={<EditIcon />}
                  variant="contained"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  endIcon={<DeleteIcon />}
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ) : (
            <Typography variant="body1">
              {" "}
              Please Select the Student to view Details{" "}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Homepage;
