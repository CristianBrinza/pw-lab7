
# To Do App

This is a full-stack To Do application built with React (frontend) and Node.js/Express/MongoDB (backend). It includes user authentication with JWT tokens, CRUD operations for tasks, and Swagger for API documentation.

## Project Structure

```
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares
│   │   └── auth.js
│   ├── models
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── swagger
│   │   └── swagger.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── TaskPage.tsx
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── pages
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── package.json
├── .gitignore
└── README.md
```

## Features

- User registration and login with JWT authentication
- CRUD operations for tasks
- Pagination for tasks
- Swagger documentation for API endpoints

## Prerequisites

- Node.js and npm
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

## Running the Application

1. **Start the backend server:**

   ```bash
   cd backend
   npx nodemon index.js
   ```

2. **Start the frontend development server:**

   ```bash
   cd frontend
   npm start
   ```

   The frontend server will run on `http://localhost:3000` and the backend server will run on `http://localhost:5001`.

## API Documentation

The API is documented using Swagger. Once the backend server is running, you can access the API documentation at `http://localhost:5001/api-docs`.

## Usage

1. **Register a new user:**

   - Endpoint: `POST /api/auth/register`
   - Body:
     ```json
     {
       "username": "your_username",
       "password": "your_password",
       "role": "your_role"
     }
     ```

2. **Login:**

   - Endpoint: `POST /api/auth/login`
   - Body:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```

3. **Get tasks (with pagination):**

   - Endpoint: `GET /api/tasks`
   - Query parameters: `page`, `limit`

4. **Create a new task:**

   - Endpoint: `POST /api/tasks`
   - Body:
     ```json
     {
       "title": "task_title",
       "description": "task_description"
     }
     ```

5. **Update a task:**

   - Endpoint: `PUT /api/tasks/{id}`
   - Body:
     ```json
     {
       "title": "updated_title",
       "description": "updated_description"
     }
     ```

6. **Delete a task:**

   - Endpoint: `DELETE /api/tasks/{id}`

## License

This project is licensed under the MIT License.
