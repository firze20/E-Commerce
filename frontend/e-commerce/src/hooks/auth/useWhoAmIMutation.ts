import { useMutation } from "@tanstack/react-query";
import { whoami } from "@/api/authApi";

export const useWhoAmIMutation = () => {
    return useMutation({
        mutationFn: whoami,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err);
        },
    });
};