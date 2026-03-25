# WDD2 E-Commerce Store

A full-stack e-commerce application built with React, Node.js/Express, and MongoDB.

## Tech Stack

- **Frontend**: React 19, React Router DOM 7, Vite
- **Backend**: Node.js, Express 5, MongoDB, Mongoose 9
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Project Structure

```
WDD2/
├── wdd2-project/
│   ├── activities/
│   │   ├── backend/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── uploads/
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   └── frontend/
│   │       ├── src/
│   │       │   ├── components/
│   │       │   ├── pages/
│   │       │   ├── contexts/
│   │       │   ├── services/
│   │       │   └── App.jsx
│   │       └── package.json
│   └── package.json
└── README.md
```

## Features

### Customer Features
- User registration and login with JWT
- Product browsing with search functionality
- Shopping cart with localStorage persistence
- Checkout with shipping address
- Order history and tracking

### Admin Features
- Product CRUD operations
- Inventory management dashboard
- Stock tracking

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd wdd2-project/activities/backend
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

```bash
cd wdd2-project/activities/frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/orders` - Get user's orders
- `GET /api/orders` - Get all orders (admin)

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## License

ISC
