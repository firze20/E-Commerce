import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PaginationProvider } from "./context/shop/PaginationProvider";
import { FilterProvider } from "./context/shop/FilterProvider";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";
import ManagerLayout from "@/layout/ManagerLayout";
// Client 
import Home from "./views/home/Home";
import Auth from "./views/auth/Auth";
import Shop from "./views/shop/Shop";
import Item from "./views/shop/Items/Item";
import About from "./views/about/About";
import NotFound from "./views/notfound/NotFound";
import LogOut from "./views/auth/LogOut";
import MyCart from "./views/cart/MyCart";
import MyPurchases from "./views/purchases/MyPurchases";
// Manager
import Manager from "./views/manager/Manager";
import NewItem from "./views/manager/views/NewItem";
import NewCategory from "./views/manager/views/NewCategory";
import ManagerItems from "./views/manager/views/ManagerItems";
import EditItem from "./views/manager/views/EditItem";


function App() {
  return (
    <>
      <ToastContainer />
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
              <PaginationProvider>
                <FilterProvider>
                  <Routes>
                    <Route element={<AppLayout />}>
                      {" "}
                      {/* App Layout */}
                      <Route path="/" element={<Home />} />{" "}
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/item/:id" element={<Item />} />
                      <Route path="/cart" element={<MyCart />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/logout" element={<LogOut />} />
                      <Route path="/purchases" element={<MyPurchases />} />
                      {/* Catch-all route for unknown paths */}
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route element={<AuthLayout />}>
                      {" "}
                      {/* Auth Layout */}
                      <Route path="/authentication" element={<Auth />} />{" "}
                    </Route>{" "}
                    {/* Manager Layout */}
                    <Route element={<ManagerLayout />}>
                      <Route path="/manager" element={<Manager />} />
                      <Route path="/manager/items" element={<ManagerItems />} />
                      <Route path="/manager/new-item" element={<NewItem />} />
                      <Route path="/manager/new-category" element={<NewCategory />} />
                      <Route path="/manager/edit-item/:id" element={<EditItem />} />
                    </Route>
                  </Routes>
                </FilterProvider>
              </PaginationProvider>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
