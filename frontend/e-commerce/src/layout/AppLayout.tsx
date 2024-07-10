import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./appLayout.module.css";
// import Sidebar from "./components/SideBar";


const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      {" "}
      <div className="col-span-2 row-span-1">
        <Header />
      </div>
      {/* <aside className="row-start-2 row-span-1">
        <Sidebar />
      </aside> */}
      <main className="col-start-1 col-span-2">
        <Outlet />
      </main>
      <div className="col-span-2">
        <Footer />
      </div>{" "}
    </div>
  );
};

export default AppLayout;