import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

import Dashboard from "./views/home/Welcome";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />{" "}
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/register" element={<Register />} />
            </Route>{" "}
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
