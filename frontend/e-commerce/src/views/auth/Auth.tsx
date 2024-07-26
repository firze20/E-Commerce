import Login from "./login/Login";
import Register from "./register/Register";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext).authState;

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

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
