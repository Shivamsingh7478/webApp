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
![signup](https://github.com/user-attachments/assets/04403a0e-05d1-4421-a4d3-bb8888c8aa2f)


#### Login Page
![login](https://github.com/user-attachments/assets/d63d9277-4b11-447b-89b9-d9369f186481)


### Product Management

#### Product List
![product-list](https://github.com/user-attachments/assets/e7c3fe9e-da29-4194-a279-cd5b83b2f711)


#### Add Product
![add-product](https://github.com/user-attachments/assets/74019097-cf90-42e6-98a3-f20f46eec876)
![add-product (2)](https://github.com/user-attachments/assets/fe1d3150-425e-4ee2-9af6-60e5a9202182)


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
