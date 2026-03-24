# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js v18+ installed
- MongoDB (local or MongoDB Atlas account)
- npm package manager

---

## Backend Setup

### Step 1: Navigate to backend folder
```bash
cd activities/backend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create .env file
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/wdd2-store
JWT_SECRET=your_secret_key_here
PORT=3000
```

### Step 4: Start server
```bash
npm run dev
```
✅ Backend running on `http://localhost:3000`

---

## Frontend Setup

### Step 1: Navigate to frontend folder
```bash
cd activities/frontend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start development server
```bash
npm run dev
```
✅ Frontend running on `http://localhost:5173`

---

## 🎨 Theme Colors

- **Primary Red**: `#8b1d1d` (buttons, links)
- **Dark Red**: `#5c0f0f` (backgrounds)
- **Gold**: `#d4a76d` (accents)
- **White**: `#ffffff` (cards)

---

## 👤 Test Accounts

### Create Admin Account
1. Sign up with admin credentials
2. Update user role in MongoDB:
```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "Admin" } })
```
3. Login and access `/inventory` dashboard

### Create Customer Account
1. Sign up with customer email
2. Browse products
3. Add to cart
4. Checkout

---

## 📝 API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/products | No | Get all products |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/orders | User | Create order |
| GET | /api/orders/user/orders | User | Get my orders |

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- Verify mongosh is installed: `npm i -g mongosh`

### CORS Error
- Backend must be running on :3000
- Frontend on :5173
- Check CORS config in `backend/index.js`

### Token Expired
- Clear browser localStorage
- Login again
- Token expires in 7 days

---

## 📚 Project Structure

```
wdd2-project/
├── activities/
│   ├── backend/
│   │   ├── models/        (User, Product, Order)
│   │   ├── controllers/   (auth, product, order)
│   │   ├── routes/        (API endpoints)
│   │   ├── middleware/    (JWT verification)
│   │   └── index.js       (Express server)
│   └── frontend/
│       ├── src/
│       │   ├── pages/     (Login, Cart, Checkout, etc)
│       │   ├── components/(ProductCard, Header, Footer)
│       │   ├── contexts/  (Auth, Cart state)
│       │   ├── services/  (API calls)
│       │   └── App.jsx    (Routes)
│       └── vite.config.js
└── README.md
```

---

## ✨ Features Implemented

✅ User Authentication (JWT, Sign up/Login panels)
✅ Product Listing with Search
✅ Shopping Cart with Local Storage
✅ Checkout with Order Creation
✅ Admin Product Management (CRUD)
✅ Dark Red/White/Gold Theme
✅ Responsive Design
✅ Form Validation
✅ Protected Routes

---

## 🚢 Next Steps for Production

1. Update JWT_SECRET to strong random value
2. Set up MongoDB Atlas for cloud database
3. Configure environment variables for production
4. Add HTTPS/SSL certificates
5. Deploy backend (Heroku, Railway, Render)
6. Deploy frontend (Vercel, Netlify)
7. Set up payment processing (Stripe/PayPal)
8. Configure email notifications

---

## 📞 Support

For issues:
1. Check the main README.md for detailed documentation
2. Verify all dependencies are installed: `npm install`
3. Ensure MongoDB is running
4. Check browser console for errors
5. Review backend logs for API errors

---

Happy coding! 🎉
