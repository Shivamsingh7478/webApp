# Product Management System

A full-stack web application for managing products with user authentication and CRUD operations.

## Features

- User Authentication (Login/Signup)
- Product Management (Create, Read, Update, Delete)
- Product Filtering and Search
- Image Upload
- Responsive Design

## Screenshots

### Authentication Pages

#### Signup Page
![Signup Page](./screenshots/signup.png)

#### Login Page
![Login Page](./screenshots/login.png)

### Product Management

#### Product List
![Product List](./screenshots/product-list.png)

#### Add Product
![Add Product](./screenshots/add-product.png)

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Prisma ORM
- JWT Authentication

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000

# Frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Run the application
```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd frontend
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
