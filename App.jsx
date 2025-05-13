import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import POS from "./pages/POS";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/pos" element={<ProtectedRoute><POS /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<OrderHistory />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
