import { verifyToken } from "../utils/tokenUtils.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const { valid, decoded, error } = await verifyToken(token);
    if (!valid) {
      return res.status(401).json({ message: error });
    }
    req.userId = decoded.id;
    req.userType = decoded.userType;
    console.log("USERID", decoded.id, decoded.userType);
    console.log("USERID", res.userId, res.userType);
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying token" });
  }
};
