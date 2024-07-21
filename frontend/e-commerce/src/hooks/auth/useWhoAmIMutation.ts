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
            toast.success("User info sucessfully fetched", {
                toastId: "who-am-i"
            });
            updateAuthState({
                isAuthenticated: true,
                user: res.data.user,
            });
        },
        onError: () => {
            toast.info(`Register or Log In to start shopping! 🛒`, {
                toastId: "who-am-i"
            });
            updateAuthState({
                isAuthenticated: false,
                user: null,
            });
        },
    });
};