import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const formRef = useRef(null);
  useEffect(() => {
    const handleOustsieClick = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
      }
    };
    document.addEventListener("mousedown", handleOustsieClick);

    return () => {
      document.removeEventListener("mousedown", handleOustsieClick);
    };
  }, []);

  const handleSumbmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (name.trim() === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (email.trim() === "") {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/create/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = response.json();

      if (response.ok) {
        alert("Registered Scessfully");
        setName("");
        setEmail("");
        setPassword("");
      } else if (response.status === 4000) {
        alert("Email is already registered");
      } else {
        alert(data.message || "Error During signup , please try again");
      }
    } catch (error) {
      console.log("Error During SIgnup", error);
      alert("Error During SIgnup , Please try again");
    }
  };

  return (
    <Box
      ref={formRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        margin: "200px auto",
        boxShadow: 3,
        width: "500px",
        height: "400px",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Sign Up
      </Typography>
      <TextField
        sx={{ maxWidth: "400px" }}
        type="name"
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (nameError) setNameError(false);
        }}
        error={nameError}
        helperText={nameError ? "Pleas enter a valid name " : ""}
      />
      <TextField
        sx={{ maxWidth: "400px" }}
        
        type="email"
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError(false);
        }}
        error={emailError}
        helperText={emailError ? "Please enter a vaid email" : ""}
      />
      <TextField
        sx={{ maxWidth: "400px" }}
        type="password"
        label="Password"
        fullWidth
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError(false);
        }}
        error={passwordError}
        helperText={passwordError ? "Please enter a valid password" : ""}
      />
      <Button variant="contained" onClick={handleSumbmit}>
        {" "}
        Sign up{" "}
      </Button>
      <Link to="/"> Log in </Link>
    </Box>
  );
};
export default Signup;
