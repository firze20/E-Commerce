import React, { createContext, useState } from "react";
import { AuthState } from "./types/Auth.types";
import { useCookies } from "react-cookie";
// import { useWhoAmIMutation } from "@/hooks/auth/useWhoAmIMutation";
// import { useEffect } from "react";

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<{
  authState: AuthState;
  updateAuthState: (newAuthState: AuthState) => void;
}>({
  authState: initialAuthState,
  updateAuthState: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides authentication context to the application.
 * @param children - The child components to be wrapped by the AuthProvider.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [cookies, setCookie] = useCookies(["auth"]);
  const [authState, setAuthState] = useState<AuthState>(cookies.auth || initialAuthState);


  // const { mutate } = useWhoAmIMutation();

  // useEffect(() => {
  //   if (!cookies.auth ) {
  //     //mutate();
  //     console.log("No cookie found");
  //   }
  // }, []);



  const updateAuthState = (newAuthState: AuthState) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 365); // 1 Hour
    setAuthState(newAuthState);
    setCookie("auth", newAuthState, { path: "/", expires });
  };


  
  return (
    <AuthContext.Provider value={{ authState, updateAuthState}}>{children}</AuthContext.Provider>
  );
};
