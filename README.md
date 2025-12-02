# Task Management API

> Backend API for a Task Management application — users can register, login, and manage tasks (create, read, update, delete).  
> Built with Node.js, Express, and PostgreSQL (Neon). Authentication via JWT. Deployed on Render.

---

## Live demo
**API Base URL (live)**: https://kumudu-task.onrender.com

**GitHub Repo**: https://github.com/HariprasathIT/kumudu_task

---

## Features
- User registration and login with hashed passwords (bcrypt)
- JWT authentication and protected routes
- Task CRUD: create, list, read single, update, delete (per-user)
- Filtering by `status` and `priority`
- Sorting by `createdAt` or `priority`
- Pagination (`page` & `limit`)
- Input validation via `express-validator`
- Deployed to Render with environment variables

---

## Tech stack
- Node.js (ES modules)
- Express
- PostgreSQL (Neon)
- `pg` for DB queries
- `bcrypt` for password hashing
- `jsonwebtoken` for JWT
- `express-validator` for input validation
- Deployed on Render

---

## Project structure (important files)
