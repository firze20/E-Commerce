import { Outlet } from "react-router-dom";
import Navbar from "./components/manager/Navbar";
import { Roles } from "@/context/types/Auth.types";
import Permission from "@/components/common/permissions/Permission";

const ManagerLayout = () => {
  return (
    <div>
      <main className="container mx-auto">
        <Permission
          roles={[Roles.Admin, Roles.Manager]}
          noAccess={() => <h1 className="text-error">Access denied</h1>}
        >
          <Navbar />
          <Outlet />
        </Permission>
      </main>
    </div>
  );
};

export default ManagerLayout;
