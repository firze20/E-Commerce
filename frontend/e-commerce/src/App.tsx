import { lazy, Suspense } from "react"; // Better performance with lazy loading, Suspense for loading state
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

// Lazy loading views for better performance
const Home = lazy(() => import("./views/home/Home"));
const Auth = lazy(() => import("./views/auth/Auth"));
const Shop = lazy(() => import("./views/shop/Shop"));
const Item = lazy(() => import("./views/shop/Items/Item"));
const About = lazy(() => import("./views/about/About"));
const NotFound = lazy(() => import("./views/notfound/NotFound"));
const LogOut = lazy(() => import("./views/auth/LogOut"));
const MyCart = lazy(() => import("./views/cart/MyCart"));
const MyPurchases = lazy(() => import("./views/purchases/MyPurchases"));
// Manager
const Manager = lazy(() => import("./views/manager/Manager"));
const NewItem = lazy(() => import("./views/manager/views/NewItem"));
const NewCategory = lazy(() => import("./views/manager/views/NewCategory"));
const ManagerItems = lazy(() => import("./views/manager/views/ManagerItems"));
const EditItem = lazy(() => import("./views/manager/views/EditItem"));

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
                      <Route
                        path="/"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                          </Suspense>
                        }
                      />{" "}
                      <Route
                        path="/shop"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Shop />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/shop/item/:id"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Item />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <MyCart />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/about"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <About />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/logout"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <LogOut />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/purchases"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <MyPurchases />
                          </Suspense>
                        }
                      />
                      {/* Catch-all route for unknown paths */}
                      <Route
                        path="*"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <NotFound />
                          </Suspense>
                        }
                      />
                    </Route>
                    <Route element={<AuthLayout />}>
                      {" "}
                      {/* Auth Layout */}
                      <Route
                        path="/authentication"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Auth />
                          </Suspense>
                        }
                      />{" "}
                    </Route>{" "}
                    {/* Manager Layout */}
                    <Route element={<ManagerLayout />}>
                      <Route
                        path="/manager"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Manager />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manager/items"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <ManagerItems />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manager/new-item"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <NewItem />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manager/new-category"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <NewCategory />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manager/edit-item/:id"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <EditItem />
                          </Suspense>
                        }
                      />
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