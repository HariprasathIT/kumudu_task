import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

// Protected routes
router.post("/addtask", auth, createTask);
router.get("/gettask", auth, getTasks);
router.get("/getsingletask/:id", auth, getTaskById);
router.put("/updatetask/:id", auth, updateTask);
router.delete("/deletetask/:id", auth, deleteTask);

export default router;
