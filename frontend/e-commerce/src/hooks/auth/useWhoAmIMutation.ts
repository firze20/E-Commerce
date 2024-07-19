import { useMutation } from "@tanstack/react-query";
import { whoami } from "@/api/auth/authApi";
import { AuthContext } from "@/context/AuthContext";
import {useContext} from "react";

export const useWhoAmIMutation = () => {

    const { updateAuthState } = useContext(AuthContext);

    return useMutation({
        mutationFn: whoami,
        onSuccess: (res) => {
            console.log(res.data.user.name)
            updateAuthState({
                isAuthenticated: true,
                user: res.data.user,
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });
};