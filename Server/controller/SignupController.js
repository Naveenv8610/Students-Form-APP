const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(200)
      .json({
        message: "User registerd sucessfully",
        user: { name: user.name, email: user.email, password: user.password },
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = Signup;
