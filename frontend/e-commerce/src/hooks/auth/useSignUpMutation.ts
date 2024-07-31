import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/authApi";
import { toast } from "react-toastify";
import { ErrorApiResponse } from "@/types/error/ErrorResponse";

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            // Show a success toast 
            toast.success("User created successfully");
        },
        onError: (err: ErrorApiResponse) => {
            if(err.response.data) {
                toast.error(`Error creating user: ${err.response.data.message}`);
            } else toast.error(`Error creating user`);
        },
    });
}