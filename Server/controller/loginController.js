const User = require("../models/user");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  const { email, password } = req.body;
  //   console.log("Email and Password ", email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "Login Sucessfull",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "server Errror", error });
  }
};
module.exports = Login;
