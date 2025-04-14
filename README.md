# 🧩 Fullstack CRUD App (Next.js + Node.js + MongoDB)

This is a fullstack microservice-based CRUD application built with:

- 🔥 **Frontend**: Next.js (App Router)
- 🚀 **Backend**: Node.js + Express + MongoDB
- 🐳 **Dockerized**: Docker Compose with multi-service setup

---

## 📁 Project Structure

fullstack-crud-app/ ├── frontend/ # Next.js frontend (port 3000) ├── backend/ # Node.js + Express backend (port 5000) ├── docker-compose.yml └── README.md

## ⚙️ Requirements

-   [Docker](https://www.docker.com/products/docker-desktop)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   Ports `3000`, `5000`, and `27017` should be free

---

## 🚀 How to Run This Project

Here's how to get the project up and running:

1.  Clone the repository:

    ```
    git clone https://github.com/Rajat-9536/fullstack-crud-app.git
    cd fullstack-crud-app
    ```

2.  Create the backend environment file:

    ```
    echo. > backend\.env
    ```
    ### or create manually inside the backend folder


3.  Add the following content to the `backend/.env` file:

    ```
    PORT=5000
    MONGODB_URI=mongodb://mongo:27017/Cluster0  # Sample of MongoDB connection string
    ```

4.  Create the frontend environment file:

    ```
    echo. > frontend\.env
    ```
    ### or create manually inside the frontend folder

5.  Add the following content to the `frontend/.env` file:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

6.  After navigating to the main project directory, run the Docker Compose command:

    ```
    docker compose up --build
    ```
