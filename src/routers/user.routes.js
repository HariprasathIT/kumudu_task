import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middleware/user.validation.js";

const router = express.Router();

// REGISTER
router.post("/register", validateRegister, registerUser);

// LOGIN
router.post("/login", validateLogin, loginUser);

export default router;
