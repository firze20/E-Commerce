import { useMutation } from "@tanstack/react-query";
import { whoami } from "@/api/auth/authApi";
import { AuthContext } from "@/context/AuthContext";
import {useContext} from "react";
import { toast } from "react-toastify";

export const useWhoAmIMutation = () => {

    const { updateAuthState } = useContext(AuthContext);

    return useMutation({
        mutationFn: whoami,
        onSuccess: (res) => {
            toast.success("User info sucessfully fetched");
            updateAuthState({
                isAuthenticated: true,
                user: res.data.user,
            });
        },
        onError: (err) => {
            toast.error(`Error signing in: ${err}`);
            updateAuthState({
                isAuthenticated: false,
                user: null,
            });
        },
    });
};