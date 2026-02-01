# Blog API with FeathersJS

A RESTful Blog API built with FeathersJS framework, demonstrating authentication, authorization, and CRUD operations.

## Features

- **User Authentication** - Register and login with JWT tokens
- **CRUD Operations** - Create, read, update, delete blog posts
- **Authorization** - Users can only modify/delete their own posts
- **Validation** - Data validation on create and update operations
- **Error Handling** - Comprehensive error handling with meaningful messages

## Tech Stack

- **Node.js** - JavaScript runtime
- **FeathersJS** - REST API framework
- **Express.js** - Web framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

## Installation
```bash
npm install
```

## Running
```bash
node app.js
```

Server runs on: `http://localhost:3000`

## API Endpoints

### Users
- `POST /users` - Register new user
- `POST /login` - Login and get JWT token

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create post (requires auth)
- `PUT /posts/:id` - Update own post (requires auth)
- `DELETE /posts/:id` - Delete own post (requires auth)

## Project Structure
```
├── app.js           - Application entry point
├── authHooks.js     - Authentication hooks
├── services.js      - Post service with CRUD logic
├── userService.js   - User service with auth logic
├── config.js        - Configuration (JWT secret)
├── hooks.js         - Validation hooks
└── package.json     - Dependencies
```

## Learning Outcomes

This project demonstrates:
- Service-based architecture with FeathersJS
- JWT authentication and authorization
- Hooks for validation and middleware logic
- RESTful API design principles
- Authorization checks for resource protection