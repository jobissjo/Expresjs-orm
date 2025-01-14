import express from "express";
import {
  createUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  LoginUser,
} from "../controllers/userController.js";
import { authenticate, adminAuthenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", adminAuthenticate,getAllUsers);
router.post("/login/", LoginUser);
router.get("/detail", authenticate, getCurrentUser);
router.get("/:id", getUserById);


export default router;
