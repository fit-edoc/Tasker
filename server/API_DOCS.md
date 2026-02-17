# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created` with User object and Token.

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` with User object and Token.

## Tasks (Protected)
*Requires `Authorization: Bearer <token>` header.*

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Response**: List of tasks.

### Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "My Task",
    "description": "Task details",
    "status": "pending" 
  }
  ```
- **Response**: `200 OK` with created task.

### Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Body**: (Any field to update)
  ```json
  {
    "status": "completed"
  }
  ```

### Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
