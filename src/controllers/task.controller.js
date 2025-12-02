import { pool } from "../config/db.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const userId = req.user.id;

    const newTask = await pool.query(
      `INSERT INTO tasks (title, description, priority, status, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, priority, status, userId]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask.rows[0]
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create task", error: error.message });
  }
};


// GET ALL TASKS (With Filtering + Sorting + Pagination)
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    let { status, priority, sort, page = 1, limit = 10 } = req.query;

    let query = `SELECT * FROM tasks WHERE user_id = $1`;
    let values = [userId];

    // FILTERING
    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }
    if (priority) {
      values.push(priority);
      query += ` AND priority = $${values.length}`;
    }

    // SORTING
    if (sort === "createdAt") {
      query += " ORDER BY created_at DESC";
    } else if (sort === "priority") {
      query += " ORDER BY priority ASC";
    }

    // PAGINATION
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const tasks = await pool.query(query, values);

    res.json({
      success: true,
      tasks: tasks.rows
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks", error: error.message });
  }
};


// GET TASK BY ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId]
    );

    if (task.rows.length === 0)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.json({ success: true, task: task.rows[0] });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get task", error: error.message });
  }
};


// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const { title, description, priority, status } = req.body;

    const updated = await pool.query(
      `UPDATE tasks 
       SET title=$1, description=$2, priority=$3, status=$4, updated_at=NOW()
       WHERE id=$5 AND user_id=$6
       RETURNING *`,
      [title, description, priority, status, taskId, userId]
    );

    if (updated.rows.length === 0)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.json({
      success: true,
      message: "Task updated successfully",
      task: updated.rows[0]
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update task", error: error.message });
  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const deleted = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [taskId, userId]
    );

    if (deleted.rows.length === 0)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete task", error: error.message });
  }
};
