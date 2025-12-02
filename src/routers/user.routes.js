import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middleware/user.validation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;
