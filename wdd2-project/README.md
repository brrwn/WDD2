# WDD2 E-Commerce Store

A full-stack e-commerce application built with React, Node.js/Express, and MongoDB. Features JWT authentication, shopping cart, product management, and checkout functionality.

## Project Features

### Customer Features

- **User Authentication**: Sign up and log in using JWT (JSON Web Tokens)
- **Product Browsing**: Homepage displaying products with images, prices, and descriptions
- **Product Search/Filter**: Search bar to find products by name or category
- **Shopping Cart**: Add, remove, and update quantities with local storage persistence
- **Checkout Process**: Order summary and checkout with shipping address collection
- **Order Management**: View order history and status

### Admin Features

- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Desktop Dashboard**: Manage inventory with an intuitive admin dashboard
- **Stock Tracking**: Monitor product inventory levels
- **Product Analytics**: View all products and their details

## Tech Stack

### Frontend

- React 19.2
- React Router DOM 7.13
- CSS3 (Custom styling with theme variables)
- Context API (Authentication & Cart state management)

### Backend

- Node.js with Express 5.2
- MongoDB with Mongoose 9.3
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone & Setup Backend

```bash
cd activities/backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGO_URI=mongodb://your-connection-string
# JWT_SECRET=your-secret-key

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3000`

### 2. Setup Frontend

```bash
cd activities/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173` (Vite default)

## API Routes

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Product Routes

- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Order Routes

- `POST /api/orders` - Create order (authenticated users)
- `GET /api/orders/user/orders` - Get user's orders (authenticated)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order (authenticated)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ["User", "Admin"],
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  slug: String,
  description: String,
  price: Number,
  image: String (URL),
  countInStock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  user: ObjectId (User reference),
  items: [
    {
      product: ObjectId (Product reference),
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  status: Enum ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  shippingAddress: {
    fullName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  isPaid: Boolean,
  isDelivered: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Theme Colors

The application uses a dark red, white, and gold color scheme:

- **Primary Red**: `#8b1d1d` - Main action buttons and accents
- **Dark Red**: `#5c0f0f` - Dark backgrounds
- **Accent Gold**: `#d4a76d` - Secondary buttons and highlights
- **White**: `#ffffff` - Card backgrounds
- **Light Gold**: `#e8c8a0` - Lighter accents

## Key Pages & Components

### Pages

- **Landing** (`/`) - Product listing with search
- **Auth** (`/auth`) - Login/Sign Up with tabs
- **Cart** (`/cart`) - Shopping cart with quantity updates
- **Checkout** (`/checkout`) - Order placement with shipping form
- **Admin Dashboard** (`/inventory`) - Product management (admin only)

### Components

- **Header** - Navigation with cart badge
- **Footer** - Site footer with links
- **ProductCard** - Product display card
- **Button** - Reusable button component
- **Input** - Form input component
- **Card** - Card wrapper component

## State Management

### AuthContext

- Manages user authentication state
- Stores JWT token and user data in localStorage
- Provides login/logout/register functions

### CartContext

- Manages shopping cart state
- Persists cart to localStorage
- Provides add/remove/update cart functions

## Development Milestones

1. ✅ **Phase 1**: Express server and MongoDB setup
2. ✅ **Phase 2**: Product API and frontend display
3. ✅ **Phase 3**: JWT authentication system
4. ✅ **Phase 4**: Shopping cart with Context API
5. ✅ **Phase 5**: UI styling with dark red/black/silver theme

## How to Use

### As a Customer

1. Visit the homepage to browse products
2. Sign up or log in
3. Search or filter products by name
4. Click "Add to Cart" to add items
5. View your cart to review items
6. Click "Proceed to Checkout"
7. Complete order with Cash on Delivery

### As an Admin

1. Create an admin account (set role in database or contact owner)
2. Navigate to `/inventory`
3. Use the dashboard to:
   - Add new products with images and prices
   - Edit existing product details
   - Update stock quantities
   - Delete products

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Product categories and filtering
- [ ] User profile and order history
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Product pagination
- [ ] Admin analytics dashboard
- [ ] Wishlist feature
- [ ] More payment methods

## Troubleshooting

### MongoDB Connection Issues

- Check MONGO_URI in .env file
- Ensure MongoDB is running
- Verify connection string format

### JWT Token Errors

- Clear browser localStorage
- Check JWT_SECRET in .env matches backend
- Re-login if token is expired

### CORS Errors

- Ensure backend is running on port 3000
- Check CORS configuration in index.js
- Verify frontend is on localhost:5173

## License

ISC

## Notes

- Change default JWT_SECRET before deploying to production
- Use environment variables for all sensitive data
- Implement payment processing before going live
- Add SSL/TLS for production deployment
