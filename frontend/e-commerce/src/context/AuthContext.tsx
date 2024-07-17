import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
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
    
    const cookies = new Cookies();

    // function getCookie(name: string) {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if(parts.length === 2) return parts.pop()?.split(";").shift();
    // }

    // const [{ jwt }] = useCookies(["jwt"]);

    console.log(cookies.getAll());

    cookies.set("random_value", "test");


    useEffect(() => {
        const jwt = cookies.get("jwt");
        console.log("Cookie value" + " " + jwt);
        if(jwt) {
            const decodedJwt = jwtDecode<JwtPayload>(jwt);
            setAuthState({
                isAuthenticated: true,
                user: decodedJwt,
                roles: decodedJwt.roles,
            });
        }
    }, []); 

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}