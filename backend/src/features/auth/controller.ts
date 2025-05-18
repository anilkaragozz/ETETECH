import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./model";

// POST /api/auth/register
export const register: RequestHandler = async (req, res) => {
  const { name, surname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match." });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "This email is already in use." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    surname,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully." });
};

// POST /api/auth/login
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  res.json({ accessToken: token, message: "Login successful." });
};

// POST /api/auth/logout
export const logout: RequestHandler = async (_req, res) => {
  res.json({ message: "Logged out successfully." });
};
