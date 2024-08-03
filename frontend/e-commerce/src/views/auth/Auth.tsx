import Login from "./login/Login";
import Register from "./register/Register";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

const Auth = () => {

  const { isAuthenticated } = useContext(AuthContext).authState;

  if(isAuthenticated) return <Navigate to="/" />;

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div role="tablist" className="tabs tabs-lifted">
      <a
        role="tab"
        className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("login")}
      >
        Login
      </a>
      <a
        role="tab"
        className={`tab ${activeTab === "register" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("register")}
      >
        Register
      </a>
      <div className="flex justify-center items-center min-h-7 col-span-2">
        <div className="w-full max-w-xs">
          {activeTab === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
