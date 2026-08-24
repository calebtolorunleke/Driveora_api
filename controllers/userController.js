import User from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Generate   JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return JWT.sign(payload, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return;
      res.json({
        success: false,
        message: "fill all the fields",
      });

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.json({
          success: false,
          message: "User already exist",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = generateToken(user._id.toString());
      res.json({
        success: true,
        token,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
