import { Outlet } from "react-router-dom";
import styles from "./authLayout.module.css";


const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <main className="md:container md:mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default  AuthLayout;