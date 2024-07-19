import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/authApi";
import { toast } from "react-toastify";

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            // Show a success toast 
            toast.success("User created successfully");
        },
        onError: (err) => {
            toast.error(`Error creating user: ${err}`);
        },
    });
}