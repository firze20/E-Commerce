import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

import Home from "./views/home/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Shop from "./views/shop/Shop";
import Item from "./views/shop/Items/Item";
import About from "./views/about/About";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />{" "}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/item/:id" element={<Item />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/register" element={<Register />} />
            </Route>{" "}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
