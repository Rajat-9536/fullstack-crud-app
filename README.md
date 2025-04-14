# 🧩 Fullstack CRUD App (Next.js + Node.js + MongoDB)

This is a fullstack microservice-based CRUD application built with:

- 🔥 **Frontend**: Next.js (App Router)
- 🚀 **Backend**: Node.js + Express + MongoDB
- 🐳 **Dockerized**: Docker Compose with multi-service setup

---

## 📁 Project Structure

fullstack-crud-app/ ├── frontend/ # Next.js frontend (port 3000) ├── backend/ # Node.js + Express backend (port 5000) ├── docker-compose.yml └── README.md

## ⚙️ Requirements

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Ports `3000`, `5000`, and `27017` should be free

---

## 🚀 How to Run This Project

### 1. Clone the Repository

```bash
git clone https://github.com/Rajat-9536/fullstack-crud-app.git
cd fullstack-crud-app

touch backend/.env

PORT=5000
MONGODB_URI=mongodb://mongo:27017/Cluster0 ### sample of mongodb connection string

touch frontend/.env

NEXT_PUBLIC_API_URL=http://localhost:5000

### after going to the main root of project run this cmd

docker compose up --build