import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth/authApi";

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            console.log("User signed up");
        },
        onError: (err) => {
            console.log(err);
        },
    });
}