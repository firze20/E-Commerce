import { useMutation } from "@tanstack/react-query";
import { signUp, AuthResponse, SignUpUser } from "@/api/auth/authApi";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

export const useSignUpMutation = () => {
    return useMutation<AuthResponse, ApiError, SignUpUser>({
        mutationFn: signUp,
        onSuccess: () => {
            // Show a success toast 
            toast.success("User created successfully");
        },
        onError: (error) => {
            if(error.response && error.response.data.message) {
                toast.error(`Error creating user: ${error.response.data.message}`);
            } else toast.error(`Error creating user`);
        },
    });
}