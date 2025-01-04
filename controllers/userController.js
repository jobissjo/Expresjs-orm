import { log } from "console";
import User from "../models/user.js";
import { hashPassword, verifyPassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/tokenUtils.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    console.log(`hashedPassword: ${hashedPassword}`);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "email and password are required fields",
      });
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "email not found",
      });
    }
    console.log("emailPwd:", password, email);

    const isMatch = await verifyPassword(password, user.password);
    console.log("isMatch:", isMatch);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
    console.log("isMatch:", isMatch);
    const data = { id: user.id, userType: user.userType };
    const token = await generateToken(data);

    console.log("TOKEN:", token);

    res.status(200).json({
      accessToken: token,
      tokenType: "Bearer",
      userType: user.userType,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        messaage: "User not found",
      });
    }
    res.status(200).json({
      data: user,
      message: "User detail retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    console.log("userId", req.userId);
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        messaage: "User not found",
      });
    }
    res.status(200).json({
      data: user,
      message: "User detail retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};
