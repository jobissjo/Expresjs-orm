import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config/env.js";

export const generateToken = async (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1d" });
  return token;
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};
