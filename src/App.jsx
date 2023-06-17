import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NewArrival from "./pages/RellsProducts";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  // const user = false;

  const [isOpen, setIsOpen] = useState(false);
  const togle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="app">
      <Sidebar togle={togle} isOpen={isOpen} />

      <Navbar togle={togle} isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<Home togle={togle} isOpen={isOpen} />} />
        <Route path="/newarrival" element={<NewArrival />} />
        <Route
          path="/products/"
          element={<ProductList togle={togle} isOpen={isOpen} />}
        />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/Order"
          element={<Order togle={togle} isOpen={isOpen} />}
        />
      </Routes>
    </div>
  );
};

export default App;
