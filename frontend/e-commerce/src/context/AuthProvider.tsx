import React, { createContext, useState } from "react";
import { AuthState } from "./types/Auth.types";
import { useCookies } from "react-cookie";
import { useWhoAmIMutation } from "@/hooks/auth/useWhoAmIMutation";
import { useEffect } from "react";

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * Context for managing authentication state.
 */
export const AuthContext = createContext<{
  /**
   * The current authentication state.
   */
  authState: AuthState;

  /**
   * Function to update the authentication state.
   * @param newAuthState - The new authentication state.
   */
  updateAuthState: (newAuthState: AuthState) => void;

  /**
   * Function to delete cookies related to authentication.
   */
  deleteCookies: () => void;
}>({
  authState: initialAuthState,
  updateAuthState: () => {},
  deleteCookies: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides authentication context to the application.
 * @param children - The child components to be wrapped by the AuthProvider.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  const { mutate, data: user } = useWhoAmIMutation();

  useEffect(() => {
    if (!cookies.auth) {
      mutate();
    }
  }, [cookies.auth, mutate]);

  useEffect(() => {
    if (user) {
      updateAuthState({
        isAuthenticated: true,
        user: user.data.user,
      });
    }
  }, [user]);

  const [authState, setAuthState] = useState<AuthState>(
    cookies.auth || initialAuthState
  );

  const updateAuthState = (newAuthState: AuthState) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 Hour
    setAuthState(newAuthState);
    setCookie("auth", newAuthState, { path: "/", expires });
  };

  const deleteCookies = () => {
    setAuthState(initialAuthState);
    removeCookie("auth", { path: "/" })
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState, deleteCookies }}>
      {children}
    </AuthContext.Provider>
  );
};
