import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { pool } from "./src/config/db.js";

import userRoutes from "./src/routers/user.routes.js";
import taskRoutes from "./src/routers/task.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Setup Done Now we Move Next")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

pool.connect()
    .then(() => console.log("PostgreSQL (Neon) Connected"))
    .catch(err => console.error("DB Connection Error:", err));
