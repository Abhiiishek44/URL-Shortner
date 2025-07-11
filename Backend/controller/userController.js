const User = require("../model/user"); // Adjust path based on your structure
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = await User.create({ username, email, password });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //jwt auth
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "your_jwt_secret_key",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { userRegister, userLogin };
