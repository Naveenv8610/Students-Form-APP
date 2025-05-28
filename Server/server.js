const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/Signup-auth";

const authRoutes = require("./Routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/create", authRoutes);
app.use("/api/signin", authRoutes);
app.use("/api/addStudent", authRoutes);
app.use("/api/get", authRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB...");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in connnecting to MongoDB", err);
  });
