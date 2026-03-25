import Auth from "./pages/Auth.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Header from "./components/Header.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/inventory" element={<AdminDashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<OrderSummary />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
