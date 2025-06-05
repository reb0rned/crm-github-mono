# 🚀 GitHub CRM – Fullstack App (Frontend + Backend + Docker)

This is a fullstack CRM (Customer Relationship Management) system for managing public GitHub repositories using the GitHub API.

It includes:

- 🌐 Frontend: React + TypeScript + Vite + TailwindCSS
- 🔧 Backend: Node.js + Express + MongoDB
- 🐳 Dockerized: Easily run everything with Docker Compose

---

## 🧰 Tech Stack

| Layer    | Tech stack                        |
| -------- | --------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind |
| Backend  | Node.js, Express, MongoDB         |
| Auth     | JWT-based Authentication          |
| Database | MongoDB (via Docker container)    |
| DevOps   | Docker, Docker Compose            |

---

## 🚀 Getting Started

### 1. Clone this monorepo

```bash
git clone https://github.com/reb0rned/crm-github-mono.git
cd crm-github-mono
fill out .env files on fron and back as in example
docker-compose up --build
```

### Frontend: http://localhost:5173

### Backend API: http://localhost:5001/api

### MongoDB: runs in container at mongo:27017

## 🧑‍💻 Author

### GitHub: https://github.com/reb0rned
