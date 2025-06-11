import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setEmailError(false);
        setPasswordError(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleSumbmit = async (e) => {
    e.preventDefault();
    let isValid = true;
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
      const response = await fetch("http://localhost:5000/api/signin/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = response.json();
      if (response.status === 200) {
        alert("Login Sucessfull...");
        navigate("/home");
      } else if (response.status === 404) {
        alert("user not found");
      } else if (response.status === 401) {
        alert("Invalid credentails");
      } else {
        alert(data.message || "Error during login , please try again");
      }
    } catch (error) {
      return console.log("Error during login :", error);
    }
  };

  return (
    <Box
      ref={formRef}
      sx={{
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContentL: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        margin: "200px auto",
        width: "400px",
        height: "350px",
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="Secondary" mt={2}>
        Login
      </Typography>
      <TextField
        sx={{ maxWidth: "350px" }}
        fullWidth
        type="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError(false);
        }}
        error={emailError}
        helperText={emailError ? "Please enter a valid email " : ""}
      />
      <TextField
        fullWidth
        sx={{ maxWidth: "350px" }}
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError(false);
        }}
        error={passwordError}
        helperText={passwordError ? "Please enter a valid password" : ""}
      />
      <Button variant="contained" onClick={handleSumbmit}>
        Submit
      </Button>

      <Typography
        variant="body2"
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Link href="/" underline="hover">
          Forgot Password?
        </Link>

        <Link to="/signup" underline="hover">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};
export default Login;
