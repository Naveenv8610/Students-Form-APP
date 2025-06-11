import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const SideBar = ({ onselectstudent }) => {
  useEffect(() => {
    fetch("http://localhost:5000/api/get/getstudents").then((res) =>
      res
        .json()
        .then((data) => setStudents(data.students))
        .then((error) => console.log(error))
    );
  });
  const [students, setStudents] = useState([]);
  return (
    <Paper
      elevation={3}
      sx={{
        height: "100vh",
        padding: 2,
        bgcolor: "#f5f5f5",
        overflowY: "auto",
      }}
    >
      <List>
        {students.map((student) => (
          <ListItem
            button
            key={student.id}
            onClick={() => onselectstudent(student)}
            sx={{
              "&:hober": {
                bgcolor: "#d3d3d3",
              },
              cursor: "pointer",
            }}
          >
            <ListItemText primary={student.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SideBar;
