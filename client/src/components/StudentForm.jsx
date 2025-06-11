import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const StudentFrom = ({ editMode = false, student = null, onDoneEditing }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are You Sure You Want To Logout?");
    if (confirmLogout) {
      navigate("/");
    } else {
      return;
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    fatherName: "",
    motherName: "",
    studentClass: "",
    section: "",
  });

  const [error, setError] = useState({
    name: false,
    age: false,
    fatherName: false,
    motherName: false,
    studentClass: false,
    section: false,
  });

  useEffect(() => {
    if (editMode && student) {
      setFormData({
        name: student.name || "",
        age: student.age || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        studentClass: student.studentClass || "",
        section: student.section || "",
      });
    }
  }, [editMode, student]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim() !== "") {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmitForm = async () => {
    let isValid = true;
    if (formData.name.trim() === "") {
      setError((prev) => ({ ...prev, name: true }));
      isValid = false;
    }
    if (String(formData.age).trim() === "") {
      setError((prev) => ({ ...prev, age: true }));
      isValid = false;
    }
    if (formData.fatherName.trim() === "") {
      setError((prev) => ({ ...prev, fatherName: true }));
      isValid = false;
    }
    if (formData.motherName.trim() === "") {
      setError((prev) => ({ ...prev, motherName: true }));
      isValid = false;
    }

    if (formData.studentClass.trim() === "") {
      setError((prev) => ({ ...prev, studentClass: true }));
      isValid = false;
    }
    if (formData.section.trim() === "") {
      setError((prev) => ({ ...prev, section: true }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const url = editMode
        ? `http://localhost:5000/api/edit/editstudent/${student._id}`
        : "http://localhost:5000/api/addStudent/student";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editMode ? "Student Updated Sucessfully" : "Student added Sucessfully"
        );
        setFormData({
          name: "",
          age: "",
          fatherName: "",
          motherName: "",
          studentClass: "",
          section: "",
        });
        if (editMode && onDoneEditing) {
          onDoneEditing();
        }
      } else {
        alert("Operation Failed", data.message);
      }
    } catch (error) {
      alert("Server Errror", error.message);
    }

    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/api/addStudent/student",
    //     {
    //       method: "POST",
    //       headers: {
    //         "content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );
    //   const data = await response.json();
    //   if (response.ok) {
    //     alert("Student Added Sucessfully");
    //     setFormData({
    //       name: "",
    //       age: "",
    //       fatherName: "",
    //       motherName: "",
    //       studentClass: "",
    //       section: "",
    //     });
    //   } else {
    //     alert(data.message || "Error during adding");
    //   }
    // } catch (error) {
    //   alert("Server Error ", error.message);
    // }
  };
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        {" "}
        Add Student{" "}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <TextField
            name="name"
            type="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={error.name}
            helperText={error.name ? "Name is Required" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="age"
            type="number"
            label="Age"
            value={formData.age}
            onChange={handleChange}
            error={error.age}
            helperText={error.age ? "Age  is Required" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="fatherName"
            type="text"
            label="Father Name"
            value={formData.fatherName}
            onChange={handleChange}
            error={error.fatherName}
            helperText={error.fatherName ? "Father Name is Required" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="motherName"
            type="text"
            label="Mother Name"
            value={formData.motherName}
            onChange={handleChange}
            error={error.motherName}
            helperText={error.motherName ? "Mother Name is required" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="studentClass"
            type="text"
            label="Class"
            value={formData.studentClass}
            onChange={handleChange}
            error={error.studentClass}
            helperText={error.studentClass ? "Class is Required" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="section"
            type="text"
            label="Section"
            value={formData.section}
            onChange={handleChange}
            error={error.section}
            helperText={error.section ? "Section is Required" : ""}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={handleSubmitForm}>
          {editMode ? "Update" : "Sumbit"}
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};
export default StudentFrom;
