import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";

import "./App.css";

import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

import Home from "./views/home/Home";
import Auth from "./views/auth/Auth";
import Shop from "./views/shop/Shop";
import Item from "./views/shop/Items/Item";
import About from "./views/about/About";

function App() {
  return (
    <CookiesProvider>
      {" "}
      {/* Cookie Provider from react-cookie */}
      <AuthProvider>
        {" "}
        {/* Auth Provider */}
        <BrowserRouter>
          {" "}
          {/* Browser Router from react router */}
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route element={<AppLayout />}>
                {" "}
                {/* App Layout */}
                <Route path="/" element={<Home />} />{" "}
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/item/:id" element={<Item />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route element={<AuthLayout />}>
                {" "}
                {/* Auth Layout */}
                <Route path="/authentication" element={<Auth />} />{" "}
              </Route>{" "}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
