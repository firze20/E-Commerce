import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { AuthState, JwtPayload } from "./types/Auth.types";

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    roles: [],
};

export const AuthContext = createContext<AuthState>(initialAuthState);


type AuthProviderProps = {
    children: React.ReactNode;
};

/**
 * Provides authentication context to the application.
 * @param children - The child components to be wrapped by the AuthProvider.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    const [{ jwt }] = useCookies(["jwt"]);

    useEffect(() => {
        if(jwt) {
            const decodedJwt = jwtDecode<JwtPayload>(jwt);
            setAuthState({
                isAuthenticated: true,
                user: decodedJwt,
                roles: decodedJwt.roles,
            });
        }
    }, [jwt]); 

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}