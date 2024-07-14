import { Outlet } from "react-router-dom";
import styles from "./authLayout.module.css";


const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <main className="col-span-1">
        <Outlet />
      </main>
    </div>
  );
};

export default  AuthLayout;