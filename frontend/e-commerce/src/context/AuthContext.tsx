import React, { createContext, useEffect, useState } from "react";
import { AuthState } from "./types/Auth.types";
import { useWhoAmIMutation } from "@/hooks/auth/useWhoAmIMutation";

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<AuthState>(initialAuthState);

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
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const { mutate, data: user, isSuccess, isError } = useWhoAmIMutation();

  useEffect(() => {
    // Trigger the mutation on component mount

    if(authState.isAuthenticated!) {
        mutate();
    }   
 
    // This effect does not depend on `mutate`, `isSuccess`, or `isError` directly,
    // so it's not included in the dependency array. It's a one-time call on mount.
  }, []);
  
  useEffect(() => {
    // This effect listens for changes in the mutation's success or error state
    // and updates the authState accordingly.
    if (isSuccess && user) {
      setAuthState({
        isAuthenticated: true,
        user: user.data,
      });
    } else if (isError) {
      setAuthState(initialAuthState);
    }
    // Depend on `isSuccess` and `isError` to reactively update the auth state
  }, [isSuccess, isError, user]);

  
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
