import { Outlet } from "react-router-dom";
import Navbar from "./components/manager/Navbar";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";
import { Roles } from "@/context/types/Auth.types";

const ManagerLayout = () => {
  const { isAuthenticated, user } = useContext(AuthContext).authState;

  if (!isAuthenticated) return <Navigate to="/authentication" />;

  // If user is not a manager or admin, redirect to home page, will need to test with a manager role
  if (
    !user?.roles.includes(Roles.Manager) &&
    !user?.roles.includes(Roles.Admin)
  )
    return <Navigate to="/" />;

  return (
    <div>
      <main className="container mx-auto">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
